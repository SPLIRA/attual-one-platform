"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
          loadError instanceof Error ? loadError.message : "Nao foi possivel carregar a empresa.",
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
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 py-6 sm:px-6">
      <header className="flex flex-col gap-2">
        <Link
          href={`/companies/${params.companyId}`}
          className="text-sm font-medium text-slate-600 underline-offset-4 hover:underline"
        >
          Voltar
        </Link>
        <h1 className="text-3xl font-semibold text-slate-950">Editar Empresa</h1>
        <p className="text-sm text-slate-600">Atualize os dados basicos da empresa.</p>
      </header>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {isLoading ? (
        <section className="rounded-md border border-slate-200 bg-white px-4 py-8 text-sm text-slate-600">
          Carregando empresa...
        </section>
      ) : company ? (
        <CompanyForm
          initialValues={companyToFormInput(company)}
          submitLabel="Salvar alteracoes"
          isSaving={isSaving}
          onSubmit={handleSubmit}
        />
      ) : null}
    </main>
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
