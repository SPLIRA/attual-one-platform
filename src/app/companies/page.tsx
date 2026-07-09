"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CompanyEmptyState } from "@/features/companies/components/company-empty-state";
import { CompanyList } from "@/features/companies/components/company-list";
import { listCompanies } from "@/features/companies/services/company-service";
import type { CompanyListItem } from "@/features/companies/types";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const message = url.searchParams.get("message");

    if (message === "created") {
      setSuccess("Empresa cadastrada com sucesso.");
    }

    if (message === "updated") {
      setSuccess("Empresa atualizada com sucesso.");
    }

    if (message) {
      url.searchParams.delete("message");
      window.history.replaceState({}, "", url.toString());
    }

    async function loadCompanies() {
      try {
        setIsLoading(true);
        setError(null);
        setCompanies(await listCompanies());
      } catch (loadError) {
        setError(
          loadError instanceof Error ? loadError.message : "Nao foi possivel carregar empresas.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadCompanies();
  }, []);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Empresas</p>
          <h1 className="text-3xl font-semibold text-slate-950">ATTUAL ONE Insight</h1>
        </div>

        <Link
          href="/companies/new"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Nova Empresa
        </Link>
      </header>

      {success ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {success}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {isLoading ? (
        <section className="rounded-md border border-slate-200 bg-white px-4 py-8 text-sm text-slate-600">
          Carregando empresas...
        </section>
      ) : companies.length === 0 ? (
        <CompanyEmptyState />
      ) : (
        <CompanyList companies={companies} />
      )}
    </main>
  );
}
