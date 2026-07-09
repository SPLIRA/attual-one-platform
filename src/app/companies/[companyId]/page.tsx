"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CompanyDetailField } from "@/features/companies/components/company-detail-field";
import { StatusBadge } from "@/features/companies/components/status-badge";
import { getCompanyById } from "@/features/companies/services/company-service";
import type { CompanyDetails } from "@/features/companies/types";

export default function CompanyDetailsPage() {
  const params = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const message = url.searchParams.get("message");

    if (message === "created") {
      setSuccessMessage("Empresa cadastrada com sucesso.");
    }

    if (message === "updated") {
      setSuccessMessage("Empresa atualizada com sucesso.");
    }

    if (message) {
      url.searchParams.delete("message");
      window.history.replaceState({}, "", url.toString());
    }

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

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4">
        <Link
          href="/companies"
          className="text-sm font-medium text-slate-600 underline-offset-4 hover:underline"
        >
          Voltar para empresas
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Empresa</p>
            <h1 className="text-3xl font-semibold text-slate-950">
              {company?.name ?? "Detalhes da empresa"}
            </h1>
          </div>
          {company ? <StatusBadge status={company.status} /> : null}
        </div>
      </header>

      {successMessage ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {successMessage}
        </p>
      ) : null}

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
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href={`/companies/${company.id}/edit`}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Editar Empresa
            </Link>
            <button
              type="button"
              disabled
              className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-md border border-slate-300 px-5 text-base font-semibold text-slate-400"
            >
              Nova Visita
            </button>
            <button
              type="button"
              disabled
              className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-md border border-slate-300 px-5 text-base font-semibold text-slate-400"
            >
              Historico
            </button>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <CompanyDetailField label="Nome" value={company.name} />
            <CompanyDetailField label="Segmento" value={company.segment} />
            <CompanyDetailField label="Telefone" value={company.phone} />
            <CompanyDetailField label="WhatsApp" value={company.whatsapp} />
            <CompanyDetailField
              label="Instagram"
              value={company.instagram}
              href={normalizeExternalUrl(company.instagram)}
            />
            <CompanyDetailField
              label="Site"
              value={company.website}
              href={normalizeExternalUrl(company.website)}
            />
            <CompanyDetailField label="Cidade" value={company.city} />
            <CompanyDetailField label="Endereco" value={company.address} />
            <CompanyDetailField label="Ultima visita" value={formatDate(company.lastVisitAt)} />
            <CompanyDetailField label="Observacoes" value={company.notes} />
          </dl>
        </>
      ) : null}
    </main>
  );
}

function normalizeExternalUrl(value: string | null) {
  if (!value) {
    return undefined;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}

function formatDate(value: string | null) {
  if (!value) {
    return "Sem visita";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}
