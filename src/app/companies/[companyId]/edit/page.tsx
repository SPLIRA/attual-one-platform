"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";
import { LoadingState } from "@/components/ui/loading-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { CompanyForm } from "@/features/companies/components/company-form";
import { getCompanyById, updateCompany } from "@/features/companies/services/company-service";
import type { CompanyDetails, CompanyFormInput } from "@/features/companies/types";

export default function EditCompanyPage() {
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
          loadError instanceof Error ? loadError.message : "Não foi possível carregar a empresa.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadCompany();
  }, [params.companyId]);

  async function handleSubmit(input: CompanyFormInput) {
    try {
      setIsSaving(true);
      await updateCompany(params.companyId, input);
      router.push(`/companies/${params.companyId}?message=updated`);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PageShell size="narrow">
      <PageHeader
        title="Editar Empresa"
        description="Atualize os dados básicos da empresa."
        backHref={`/companies/${params.companyId}`}
      />

      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}

      {isLoading ? (
        <LoadingState>Carregando empresa...</LoadingState>
      ) : company ? (
        <CompanyForm
          initialValues={companyToFormInput(company)}
          submitLabel="Salvar alterações"
          isSaving={isSaving}
          onSubmit={handleSubmit}
        />
      ) : null}
    </PageShell>
  );
}

function companyToFormInput(company: CompanyDetails): CompanyFormInput {
  return {
    name: company.name,
    segment: company.segment ?? "",
    phone: company.phone ?? "",
    whatsapp: company.whatsapp ?? "",
    instagram: company.instagram ?? "",
    website: company.website ?? "",
    address: company.address ?? "",
    city: company.city ?? "",
    notes: company.notes ?? "",
  };
}
