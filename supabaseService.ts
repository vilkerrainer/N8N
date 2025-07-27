
import { createClient, SupabaseClient, RealtimeChannel, RealtimePostgresUpdatePayload } from '@supabase/supabase-js';
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
const POTENTIALLY_MISSING_DB_COLUMNS: (keyof Character)[] = [
  // Most fields are now expected to be in the database.
  // 'feats' is kept here as it's derived from classFeatures in the app logic
  // and should not be persisted directly to the database to avoid data duplication.
  'feats'
];

const sanitizeCharacterForDb = (characterData: Partial<Character>): { [key: string]: any } => {
  const sanitizedData: { [key: string]: any } = { ...characterData };
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
  const sanitizedCharacter = sanitizeCharacterForDb(characterWithId);

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .upsert(sanitizedCharacter as any, { onConflict: 'id' })
    .select()
    .maybeSingle(); 

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

export const updateCharacter = async (characterId: string, updates: Partial<Character>): Promise<Partial<Character> | null> => {
  const sanitizedUpdates = sanitizeCharacterForDb(updates);

  if (Object.keys(sanitizedUpdates).length === 0) {
    // If all updates were for fields not in the database (e.g. 'feats'),
    // we don't need to call Supabase. We can return the updates object
    // to be merged client-side.
    if (Object.keys(updates).length > 0) {
      return updates;
    }
    // No updates at all were provided.
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(sanitizedUpdates as any)
    .eq('id', characterId)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating character:', error.message, error);
    throw error;
  }

  if (!data) {
    // This can happen if the characterId does not exist.
    return null;
  }
  
  // Return the persisted data from the DB, merged with any original updates
  // that were not persisted (like 'feats'). Spreading `data` last ensures
  // it is the source of truth for persisted fields.
  return { ...updates, ...data };
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
      (payload: RealtimePostgresUpdatePayload<{ [key: string]: any }>) => {
        if (payload.new) {
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
