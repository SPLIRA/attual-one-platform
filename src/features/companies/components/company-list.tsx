"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { CompanyListItem } from "../types";
import { StatusBadge } from "./status-badge";

type CompanyListProps = {
  companies: CompanyListItem[];
};

export function CompanyList({ companies }: CompanyListProps) {
  const [search, setSearch] = useState("");

  const filteredCompanies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return companies;
    }

    return companies.filter((company) =>
      [company.name, company.city, company.segment].some((value) =>
        value?.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [companies, search]);

  return (
    <section className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Pesquisar</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Nome, cidade ou segmento"
          className="min-h-12 rounded-md border border-slate-300 bg-white px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
        />
      </label>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="hidden grid-cols-[1.3fr_1fr_1fr_0.8fr_1fr_96px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
          <span>Nome</span>
          <span>Segmento</span>
          <span>Cidade</span>
          <span>Status</span>
          <span>Ultima visita</span>
          <span className="text-right">Acao</span>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="px-4 py-8 text-sm text-slate-600">
            Nenhuma empresa encontrada para a pesquisa.
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {filteredCompanies.map((company) => (
              <li
                key={company.id}
                className="grid gap-3 px-4 py-4 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_1fr_96px] lg:items-center"
              >
                <div>
                  <p className="text-base font-semibold text-slate-950">{company.name}</p>
                  <p className="mt-1 text-sm text-slate-500 lg:hidden">
                    {[company.segment, company.city].filter(Boolean).join(" · ") ||
                      "Sem detalhes adicionais"}
                  </p>
                </div>

                <p className="hidden text-sm text-slate-700 lg:block">
                  {company.segment || "Nao informado"}
                </p>
                <p className="hidden text-sm text-slate-700 lg:block">
                  {company.city || "Nao informada"}
                </p>

                <StatusBadge status={company.status} />

                <p className="text-sm text-slate-600">
                  <span className="font-medium lg:hidden">Ultima visita: </span>
                  {formatDate(company.lastVisitAt)}
                </p>

                <Link
                  href={`/companies/${company.id}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 lg:min-h-10"
                >
                  Abrir
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
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
