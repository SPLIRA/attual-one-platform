"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { listCompanies } from "@/features/companies/services/company-service";
import type { CompanyListItem } from "@/features/companies/types";

export default function Home() {
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.get("created") === "1") {
      setSuccess("Empresa cadastrada com sucesso.");
      url.searchParams.delete("created");
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
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">MVP 0.1</p>
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

      <section className="rounded-md border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-slate-950">Empresas cadastradas</h2>
        </div>

        {isLoading ? (
          <p className="px-4 py-8 text-sm text-slate-600">Carregando empresas...</p>
        ) : companies.length === 0 ? (
          <div className="px-4 py-8">
            <p className="text-sm text-slate-600">Nenhuma empresa cadastrada ainda.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {companies.map((company) => (
              <li key={company.id} className="px-4 py-4">
                <h3 className="text-base font-semibold text-slate-950">{company.name}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {[company.segment, company.city].filter(Boolean).join(" · ") ||
                    "Sem detalhes adicionais"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
