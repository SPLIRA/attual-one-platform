"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { CompanyForm } from "@/features/companies/components/company-form";
import { createCompany } from "@/features/companies/services/company-service";
import type { CompanyFormInput } from "@/features/companies/types";

const initialFormState: CompanyFormInput = {
  name: "",
  segment: "",
  phone: "",
  whatsapp: "",
  instagram: "",
  website: "",
  address: "",
  city: "",
  notes: "",
};

export default function NewCompanyPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(input: CompanyFormInput) {
    try {
      setIsSaving(true);
      const companyId = await createCompany(input);
      router.push(`/companies/${companyId}?message=created`);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PageShell size="narrow">
      <PageHeader
        title="Nova Empresa"
        description="Cadastre os dados básicos para iniciar o diagnóstico."
        backHref="/companies"
      />

      <CompanyForm
        initialValues={initialFormState}
        submitLabel="Salvar empresa"
        isSaving={isSaving}
        onSubmit={handleSubmit}
      />
    </PageShell>
  );
}
