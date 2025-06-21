import { createClient, SupabaseClient } from '@supabase/supabase-js';
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
  // Ensure ID exists for upsert
  const characterWithId = { ...character, id: character.id || Date.now().toString() };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .upsert(characterWithId, { onConflict: 'id' })
    .select()
    .single(); // Assuming upsert returns the affected row

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

// Helper to get a single character, useful for checking existence
export const getCharacterById = async (characterId: string): Promise<Character | null> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', characterId)
    .maybeSingle(); // Returns one row or null

  if (error) {
    console.error('Error fetching character by ID:', error.message, error);
    // Don't throw for "not found" type errors if maybeSingle is used
    if (error.code !== 'PGRST116') { // PGRST116: "The result contains 0 rows"
         throw error;
    }
  }
  return data;
};