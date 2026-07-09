"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";
import { LoadingState } from "@/components/ui/loading-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
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
    <PageShell size="wide">
      <PageHeader
        eyebrow="Empresas"
        title="ATTUAL ONE Insight"
        description="Consulte empresas cadastradas e inicie novas visitas com poucos toques."
        actions={
          <Link
            href="/companies/new"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Nova Empresa
          </Link>
        }
      />

      {success ? <FeedbackMessage tone="success">{success}</FeedbackMessage> : null}

      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}

      {isLoading ? (
        <LoadingState>Carregando empresas...</LoadingState>
      ) : companies.length === 0 ? (
        <CompanyEmptyState />
      ) : (
        <CompanyList companies={companies} />
      )}
    </PageShell>
  );
}
