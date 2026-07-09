import { createSupabaseClient } from "@/lib/supabase";

import { diagnosisQuestions } from "../checklist";
import type { CreateDiagnosisInput, LatestDiagnosisByCompanyId } from "../types";

export async function createDiagnosis(input: CreateDiagnosisInput): Promise<string> {
  const missingQuestion = diagnosisQuestions.find((question) => !input.answers[question.id]);

  if (missingQuestion) {
    throw new Error("Responda todas as perguntas antes de salvar o diagnóstico.");
  }

  const { data, error } = await createSupabaseClient()
    .from("diagnoses")
    .insert({
      company_id: input.companyId,
      visit_id: input.visitId,
      summary: JSON.stringify({
        version: "mvp-v1.0",
        checklist: diagnosisQuestions.map((question) => ({
          id: question.id,
          section: question.section,
          question: question.question,
          answer: input.answers[question.id],
        })),
      }),
      observations: input.observations.trim() || null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
}

export async function listLatestDiagnosesByCompanyId(
  companyIds: string[],
): Promise<LatestDiagnosisByCompanyId> {
  const latestDiagnosesByCompanyId = new Map<string, string>();

  if (companyIds.length === 0) {
    return latestDiagnosesByCompanyId;
  }

  const { data, error } = await createSupabaseClient()
    .from("diagnoses")
    .select("company_id,created_at")
    .in("company_id", companyIds)
    .order("created_at", { ascending: false });

  if (error) {
    return latestDiagnosesByCompanyId;
  }

  for (const diagnosis of data ?? []) {
    if (!latestDiagnosesByCompanyId.has(diagnosis.company_id)) {
      latestDiagnosesByCompanyId.set(diagnosis.company_id, diagnosis.created_at);
    }
  }

  return latestDiagnosesByCompanyId;
}
