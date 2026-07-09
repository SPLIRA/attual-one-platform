import { createSupabaseClient } from "@/lib/supabase";

import type { CompanyListItem, CreateCompanyInput } from "../types";

function normalizeText(value: string) {
  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : null;
}

export async function listCompanies(): Promise<CompanyListItem[]> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companies")
    .select("id,name,segment,city,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createCompany(input: CreateCompanyInput): Promise<void> {
  const name = input.name.trim();
  const city = input.city.trim();

  if (!name) {
    throw new Error("Informe o nome da empresa.");
  }

  if (!city) {
    throw new Error("Informe a cidade.");
  }

  const { error } = await createSupabaseClient()
    .from("companies")
    .insert({
      name,
      city,
      segment: normalizeText(input.segment),
      phone: normalizeText(input.phone),
      whatsapp: normalizeText(input.whatsapp),
      instagram: normalizeText(input.instagram),
      website: normalizeText(input.website),
      address: normalizeText(input.address),
      notes: normalizeText(input.notes),
    });

  if (error) {
    throw new Error(error.message);
  }
}
