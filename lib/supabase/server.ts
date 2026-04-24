export function getSupabaseServiceConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  };
}

export async function supabaseServiceRest<T>(path: string, init?: RequestInit): Promise<T> {
  const { url, serviceRoleKey } = getSupabaseServiceConfig();

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase service client is not configured");
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase service request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
