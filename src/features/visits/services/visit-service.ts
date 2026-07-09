import { createSupabaseClient } from "@/lib/supabase";

import type { CreateVisitInput } from "../types";

function buildVisitNotes(input: CreateVisitInput) {
  const notes = [
    `Responsavel pela visita: ${input.responsibleName.trim()}`,
    `Tempo previsto: ${input.durationMinutes} min`,
  ];

  const initialNotes = input.initialNotes.trim();

  if (initialNotes) {
    notes.push(`Observacoes iniciais: ${initialNotes}`);
  }

  return notes.join("\n");
}

export async function createVisit(input: CreateVisitInput): Promise<string> {
  const responsibleName = input.responsibleName.trim();

  if (!responsibleName) {
    throw new Error("Informe o responsavel pela visita.");
  }

  const { data, error } = await createSupabaseClient()
    .from("visits")
    .insert({
      company_id: input.companyId,
      visit_date: input.visitDate,
      duration_minutes: input.durationMinutes,
      notes: buildVisitNotes({
        ...input,
        responsibleName,
      }),
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
}
