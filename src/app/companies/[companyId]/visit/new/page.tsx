"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";
import { LoadingState } from "@/components/ui/loading-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { getCompanyById } from "@/features/companies/services/company-service";
import type { CompanyDetails } from "@/features/companies/types";
import { VisitForm } from "@/features/visits/components/visit-form";
import { createVisit } from "@/features/visits/services/visit-service";
import type { CreateVisitInput } from "@/features/visits/types";

export default function NewVisitPage() {
  const params = useParams<{ companyId: string }>();
  const router = useRouter();
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCompany() {
      try {
        setIsLoading(true);
        setError(null);
        setCompany(await getCompanyById(params.companyId));
      } catch (loadError) {
        setError(
          loadError instanceof Error ? loadError.message : "Nao foi possivel carregar a empresa.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadCompany();
  }, [params.companyId]);

  async function handleSubmit(input: CreateVisitInput) {
    try {
      setIsSaving(true);
      const visitId = await createVisit(input);
      router.push(`/companies/${params.companyId}/visit/${visitId}/diagnosis`);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PageShell size="narrow">
      <PageHeader
        title="Nova Visita"
        description="Prepare o início do fluxo de diagnóstico."
        backHref={`/companies/${params.companyId}`}
        backLabel="Voltar para empresa"
      />

      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}

      {isLoading ? (
        <LoadingState>Carregando empresa...</LoadingState>
      ) : company ? (
        <VisitForm
          companyId={company.id}
          companyName={company.name}
          isSaving={isSaving}
          onCancel={() => router.push(`/companies/${params.companyId}`)}
          onSubmit={handleSubmit}
        />
      ) : null}
    </PageShell>
  );
}
