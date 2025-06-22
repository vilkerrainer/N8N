
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import { Character } from './types';

// IMPORTANT: These are the credentials you provided.
// In a production app, these should be environment variables and handled securely.
const supabaseUrl = 'https://wayhveuwykodaunrelxa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndheWh2ZXV3eWtvZGF1bnJlbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTY2NTAsImV4cCI6MjA2NTc5MjY1MH0.-euim-hCoLQrV0lDns1yONnlBe2xTDlZq2YyvcHHzJo';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const TABLE_NAME = 'characters';

// List of top-level keys that might not exist as dedicated columns in the DB
// and should be stripped before DB operations if they cause schema errors.
// magic.currentSpellSlots is handled within the 'magic' JSONB column, so it's not listed here.
const POTENTIALLY_MISSING_DB_COLUMNS: (keyof Character)[] = [
  'maxHitDice', 'currentHitDice', 'hitDieType',
  'currentRages', 'maxRages',
  'currentBardicInspirations', 'maxBardicInspirations',
  'currentChannelDivinityUses', 'maxChannelDivinityUses',
  'currentSecondWindUses', 'maxSecondWindUses',
  'currentActionSurgeUses', 'maxActionSurgeUses',
  'currentKiPoints', 'maxKiPoints',
  'currentLayOnHandsPool', 'maxLayOnHandsPool',
  'currentRelentlessEnduranceUses', 'maxRelentlessEnduranceUses',
  'currentBreathWeaponUses', 'maxBreathWeaponUses'
];

const sanitizeCharacterForDb = (characterData: Partial<Character>): Partial<Character> => {
  const sanitizedData = { ...characterData };
  POTENTIALLY_MISSING_DB_COLUMNS.forEach(key => {
    delete sanitizedData[key];
  });
  return sanitizedData;
};


export const getCharacters = async (): Promise<Character[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*');

  if (error) {
    console.error('Error fetching characters:', error.message, error);
    throw error;
  }
  return data || [];
};

export const saveCharacter = async (character: Character): Promise<Character | null> => {
  const characterWithId = { ...character, id: character.id || Date.now().toString() };
  const sanitizedCharacter = sanitizeCharacterForDb(characterWithId) as Character; // Cast needed after stripping optional keys

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .upsert(sanitizedCharacter, { onConflict: 'id' })
    .select()
    .single(); 

  if (error) {
    console.error('Error saving character:', error.message, error);
    throw error;
  }
  // Return the original character data (with client-side fields) 
  // as Supabase won't return the stripped fields.
  // Or, if Supabase returns the saved version, merge if necessary.
  // For simplicity, we assume the client expects the full object back if save was successful.
  // The `data` returned from supabase will be the version *without* the sanitized fields.
  // We should merge this with the original `characterWithId` to ensure the client-side state remains complete.
  return data ? { ...characterWithId, ...data } : null;
};

export const deleteCharacter = async (characterId: string): Promise<boolean> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', characterId);

  if (error) {
    console.error('Error deleting character:', error.message, error);
    throw error;
  }
  return !error;
};

export const updateCharacter = async (characterId: string, updates: Partial<Character>): Promise<Character | null> => {
  const sanitizedUpdates = sanitizeCharacterForDb(updates);

  // If all updates were sanitized away, don't hit the DB
  if (Object.keys(sanitizedUpdates).length === 0 && Object.keys(updates).length > 0) {
      // This means all updates were fields not in DB, so we can't update them via Supabase.
      // Return a representation of the character with local updates applied.
      // This requires fetching the character or having its full state.
      // For now, let's just log and return null or the original "updates" to signify client-side only.
      // Or simply proceed, and Supabase might return an empty update if no recognized columns were changed.
      // Let's proceed, if sanitizedUpdates is empty, Supabase will likely do nothing or error gracefully.
  }


  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(sanitizedUpdates)
    .eq('id', characterId)
    .select()
    .single();

  if (error) {
    console.error('Error updating character:', error.message, error);
    throw error;
  }
  // Similar to saveCharacter, merge the DB response with the intended full updates
  // to give back a complete Character object to the client if possible.
  return data ? { ...updates, ...data } as Character : null; 
};

export const getCharacterById = async (characterId: string): Promise<Character | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', characterId)
    .maybeSingle(); 

  if (error) {
    console.error('Error fetching character by ID:', error.message, error);
    if (error.code !== 'PGRST116') { 
         throw error;
    }
  }
  return data;
};

// Real-time subscription
export const subscribeToCharacterUpdates = (
  characterId: string,
  callback: (updatedCharacter: Character) => void
): RealtimeChannel => {
  const channel = supabase
    .channel(`character-${characterId}-updates`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: TABLE_NAME,
        filter: `id=eq.${characterId}`,
      },
      (payload) => {
        if (payload.new && typeof payload.new === 'object' && payload.new !== null) {
            const updatedChar = payload.new as Character;
            if (updatedChar.id && updatedChar.name) { 
                 callback(updatedChar);
            } else {
                console.warn("Received incomplete character data from subscription:", payload.new);
            }
        } else {
            console.warn("Received invalid payload from subscription:", payload);
        }
      }
    )
    .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
            console.log(`Subscribed to updates for character ${characterId}`);
        }
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            console.error(`Subscription error for character ${characterId}:`, status, err);
        }
    });

  return channel;
};

export const unsubscribeFromChannel = async (channel: RealtimeChannel) => {
  await channel.unsubscribe();
  await supabase.removeChannel(channel);
  console.log(`Unsubscribed from channel: ${channel.topic}`);
};
