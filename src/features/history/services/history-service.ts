import { createSupabaseClient } from "@/lib/supabase";

import type { VisitDiagnosisAnswer, VisitHistoryItem } from "../types";

type VisitRow = {
  id: string;
  company_id: string;
  visit_date: string | null;
  duration_minutes: number | null;
  notes: string | null;
  created_at: string | null;
};

type DiagnosisRow = {
  visit_id: string;
  summary: string | null;
  observations: string | null;
  created_at: string | null;
};

export async function listCompanyVisitHistory(companyId: string): Promise<VisitHistoryItem[]> {
  const supabase = createSupabaseClient();
  const companyName = await getCompanyName(companyId);

  const { data: visits, error } = await supabase
    .from("visits")
    .select("id,company_id,visit_date,duration_minutes,notes,created_at")
    .eq("company_id", companyId)
    .order("visit_date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const visitRows = visits ?? [];
  const diagnosesByVisitId = await listDiagnosesByVisitId(visitRows.map((visit) => visit.id));

  return visitRows.map((visit) =>
    buildHistoryItem(visit, companyName, diagnosesByVisitId.get(visit.id)),
  );
}

export async function getVisitHistoryItem(
  companyId: string,
  visitId: string,
): Promise<VisitHistoryItem> {
  const companyName = await getCompanyName(companyId);

  const { data: visit, error } = await createSupabaseClient()
    .from("visits")
    .select("id,company_id,visit_date,duration_minutes,notes,created_at")
    .eq("company_id", companyId)
    .eq("id", visitId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const diagnosesByVisitId = await listDiagnosesByVisitId([visitId]);

  return buildHistoryItem(visit, companyName, diagnosesByVisitId.get(visitId));
}

async function getCompanyName(companyId: string) {
  const { data, error } = await createSupabaseClient()
    .from("companies")
    .select("name")
    .eq("id", companyId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.name;
}

async function listDiagnosesByVisitId(visitIds: string[]) {
  const diagnosesByVisitId = new Map<string, DiagnosisRow>();

  if (visitIds.length === 0) {
    return diagnosesByVisitId;
  }

  const { data, error } = await createSupabaseClient()
    .from("diagnoses")
    .select("visit_id,summary,observations,created_at")
    .in("visit_id", visitIds)
    .order("created_at", { ascending: false });

  if (error) {
    return diagnosesByVisitId;
  }

  for (const diagnosis of data ?? []) {
    if (!diagnosesByVisitId.has(diagnosis.visit_id)) {
      diagnosesByVisitId.set(diagnosis.visit_id, diagnosis);
    }
  }

  return diagnosesByVisitId;
}

function buildHistoryItem(
  visit: VisitRow,
  companyName: string,
  diagnosis: DiagnosisRow | undefined,
): VisitHistoryItem {
  return {
    id: visit.id,
    companyId: visit.company_id,
    companyName,
    visitDate: visit.visit_date ?? visit.created_at,
    responsibleName: parseResponsibleName(visit.notes),
    durationMinutes: visit.duration_minutes,
    notes: parseInitialNotes(visit.notes),
    diagnosisCompleted: Boolean(diagnosis),
    diagnosisCreatedAt: diagnosis?.created_at ?? null,
    observations: diagnosis?.observations ?? null,
    checklist: parseChecklist(diagnosis?.summary),
  };
}

function parseResponsibleName(notes: string | null) {
  return parseLineValue(notes, ["Responsável pela visita:", "Responsavel pela visita:"]);
}

function parseInitialNotes(notes: string | null) {
  return parseLineValue(notes, ["Observações iniciais:", "Observacoes iniciais:"]);
}

function parseLineValue(notes: string | null, prefixes: string[]) {
  if (!notes) {
    return null;
  }

  for (const prefix of prefixes) {
    const line = notes.split("\n").find((item) => item.startsWith(prefix));

    if (line) {
      return line.replace(prefix, "").trim() || null;
    }
  }

  return null;
}

function parseChecklist(summary: string | null | undefined): VisitDiagnosisAnswer[] {
  if (!summary) {
    return [];
  }

  try {
    const parsed = JSON.parse(summary) as { checklist?: VisitDiagnosisAnswer[] };

    return parsed.checklist ?? [];
  } catch {
    return [];
  }
}
