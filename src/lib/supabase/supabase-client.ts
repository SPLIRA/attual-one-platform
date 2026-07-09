import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseConfig = {
  url: string;
  anonKey: string;
};

export type SupabaseConnectionResult = {
  ok: boolean;
  status?: number;
  error?: string;
};

function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return { url, anonKey };
}

export function createSupabaseClient(): SupabaseClient {
  const { url, anonKey } = getSupabaseConfig();

  return createClient(url, anonKey);
}

export async function testConnection(): Promise<SupabaseConnectionResult> {
  try {
    const { url, anonKey } = getSupabaseConfig();

    createSupabaseClient();

    const response = await fetch(`${url}/rest/v1/`, {
      method: "GET",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      cache: "no-store",
    });

    return {
      ok: response.ok,
      status: response.status,
      error: response.ok ? undefined : "Supabase connection check failed.",
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown Supabase connection error.",
    };
  }
}
