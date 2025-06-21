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

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .upsert(characterWithId, { onConflict: 'id' })
    .select()
    .single(); 

  if (error) {
    console.error('Error saving character:', error.message, error);
    throw error;
  }
  return data;
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
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', characterId)
    .select()
    .single();

  if (error) {
    console.error('Error updating character:', error.message, error);
    throw error;
  }
  return data;
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
            // Perform a more thorough check if payload.new is indeed a Character
            const updatedChar = payload.new as Character;
            if (updatedChar.id && updatedChar.name) { // Basic check for Character structure
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
