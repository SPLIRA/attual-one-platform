import { createSupabaseClient } from "@/lib/supabase";

import type {
  CompanyDetails,
  CompanyListItem,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "../types";

function normalizeText(value: string) {
  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : null;
}

export async function listCompanies(): Promise<CompanyListItem[]> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companies")
    .select("id,name,segment,city,status,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const companies = data ?? [];
  const lastVisitsByCompanyId = await listLastVisitsByCompanyId(
    companies.map((company) => company.id),
  );

  return companies.map((company) => ({
    ...company,
    lastVisitAt: lastVisitsByCompanyId.get(company.id) ?? null,
  }));
}

export async function getCompanyById(companyId: string): Promise<CompanyDetails> {
  const { data, error } = await createSupabaseClient()
    .from("companies")
    .select(
      "id,name,segment,phone,whatsapp,instagram,website,address,city,notes,status,created_at,updated_at",
    )
    .eq("id", companyId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const lastVisitsByCompanyId = await listLastVisitsByCompanyId([companyId]);

  return {
    ...data,
    lastVisitAt: lastVisitsByCompanyId.get(companyId) ?? null,
  };
}

export async function createCompany(input: CreateCompanyInput): Promise<string> {
  const name = input.name.trim();
  const city = input.city.trim();

  if (!name) {
    throw new Error("Informe o nome da empresa.");
  }

  if (!city) {
    throw new Error("Informe a cidade.");
  }

  const { data, error } = await createSupabaseClient()
    .from("companies")
    .insert({
      name,
      city,
      status: "active",
      segment: normalizeText(input.segment),
      phone: normalizeText(input.phone),
      whatsapp: normalizeText(input.whatsapp),
      instagram: normalizeText(input.instagram),
      website: normalizeText(input.website),
      address: normalizeText(input.address),
      notes: normalizeText(input.notes),
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
}

export async function updateCompany(companyId: string, input: UpdateCompanyInput): Promise<void> {
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
    .update({
      name,
      city,
      segment: normalizeText(input.segment),
      phone: normalizeText(input.phone),
      whatsapp: normalizeText(input.whatsapp),
      instagram: normalizeText(input.instagram),
      website: normalizeText(input.website),
      address: normalizeText(input.address),
      notes: normalizeText(input.notes),
      updated_at: new Date().toISOString(),
    })
    .eq("id", companyId);

  if (error) {
    throw new Error(error.message);
  }
}

async function listLastVisitsByCompanyId(companyIds: string[]) {
  const lastVisitsByCompanyId = new Map<string, string>();

  if (companyIds.length === 0) {
    return lastVisitsByCompanyId;
  }

  const { data, error } = await createSupabaseClient()
    .from("visits")
    .select("company_id,visit_date")
    .in("company_id", companyIds)
    .order("visit_date", { ascending: false });

  if (error) {
    return lastVisitsByCompanyId;
  }

  for (const visit of data ?? []) {
    if (!lastVisitsByCompanyId.has(visit.company_id)) {
      lastVisitsByCompanyId.set(visit.company_id, visit.visit_date);
    }
  }

  return lastVisitsByCompanyId;
}
