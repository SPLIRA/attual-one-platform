"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { DiagnosisChecklistForm } from "@/features/diagnoses/components/diagnosis-checklist-form";
import { createDiagnosis } from "@/features/diagnoses/services/diagnosis-service";
import type { CreateDiagnosisInput } from "@/features/diagnoses/types";

export default function DiagnosisPage() {
  const params = useParams<{ companyId: string; visitId: string }>();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(input: CreateDiagnosisInput) {
    try {
      setIsSaving(true);
      await createDiagnosis(input);
      router.push(`/companies/${params.companyId}?message=diagnosis-saved`);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PageShell size="regular">
      <PageHeader
        title="Diagnóstico da Empresa"
        description="Responda o checklist da visita antes de salvar o diagnóstico."
        backHref={`/companies/${params.companyId}`}
        backLabel="Voltar para empresa"
      />

      <DiagnosisChecklistForm
        companyId={params.companyId}
        visitId={params.visitId}
        isSaving={isSaving}
        onBack={() => router.push(`/companies/${params.companyId}`)}
        onSubmit={handleSubmit}
      />
    </PageShell>
  );
}
