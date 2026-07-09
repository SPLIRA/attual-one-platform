"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";
import { LoadingState } from "@/components/ui/loading-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { CompanyDetailField } from "@/features/companies/components/company-detail-field";
import { StatusBadge } from "@/features/companies/components/status-badge";
import { getCompanyById } from "@/features/companies/services/company-service";
import type { CompanyDetails } from "@/features/companies/types";
import { HistorySection } from "@/features/history/components/history-section";

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

    if (message === "diagnosis-saved") {
      setSuccessMessage("Diagnóstico salvo com sucesso.");
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
          loadError instanceof Error ? loadError.message : "Não foi possível carregar a empresa.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadCompany();
  }, [params.companyId]);

  return (
    <PageShell size="wide">
      <PageHeader
        eyebrow="Empresa"
        title={company?.name ?? "Detalhes da empresa"}
        description="Dados principais, última visita e status do diagnóstico."
        backHref="/companies"
        backLabel="Voltar para empresas"
        actions={company ? <StatusBadge status={company.status} /> : null}
      />

      {successMessage ? <FeedbackMessage tone="success">{successMessage}</FeedbackMessage> : null}

      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}

      {isLoading ? (
        <LoadingState>Carregando empresa...</LoadingState>
      ) : company ? (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href={`/companies/${company.id}/edit`}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Editar Empresa
            </Link>
            <Link
              href={`/companies/${company.id}/visit/new`}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-base font-semibold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Nova Visita
            </Link>
            <a
              href="#historico"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-base font-semibold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Histórico
            </a>
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
            <CompanyDetailField label="Endereço" value={company.address} />
            <CompanyDetailField label="Última visita" value={formatDate(company.lastVisitAt)} />
            <CompanyDetailField label="Data da visita" value={formatDate(company.lastVisitAt)} />
            <CompanyDetailField
              label="Status"
              value={company.latestDiagnosisAt ? "Diagnóstico concluído" : "Diagnóstico pendente"}
            />
            <CompanyDetailField label="Observações" value={company.notes} />
          </dl>

          <HistorySection companyId={company.id} />
        </>
      ) : null}
    </PageShell>
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
