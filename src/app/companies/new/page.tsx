"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 py-6 sm:px-6">
      <header className="flex flex-col gap-2">
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 underline-offset-4 hover:underline"
        >
          Voltar
        </Link>
        <h1 className="text-3xl font-semibold text-slate-950">Nova Empresa</h1>
        <p className="text-sm text-slate-600">
          Cadastre os dados basicos para iniciar o diagnostico.
        </p>
      </header>

      <CompanyForm
        initialValues={initialFormState}
        submitLabel="Salvar empresa"
        isSaving={isSaving}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
