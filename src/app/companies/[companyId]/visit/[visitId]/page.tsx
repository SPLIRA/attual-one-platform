"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";
import { LoadingState } from "@/components/ui/loading-state";
import { PageHeader } from "@/components/ui/page-header";
import { PageShell } from "@/components/ui/page-shell";
import { DiagnosisAnswerList } from "@/features/history/components/diagnosis-answer-list";
import { formatDateTime, formatDuration } from "@/features/history/components/history-card";
import { getVisitHistoryItem } from "@/features/history/services/history-service";
import type { VisitHistoryItem } from "@/features/history/types";

export default function VisitSummaryPage() {
  const params = useParams<{ companyId: string; visitId: string }>();
  const [item, setItem] = useState<VisitHistoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVisit() {
      try {
        setIsLoading(true);
        setError(null);
        setItem(await getVisitHistoryItem(params.companyId, params.visitId));
      } catch (loadError) {
        setError(
          loadError instanceof Error ? loadError.message : "Não foi possível carregar a visita.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadVisit();
  }, [params.companyId, params.visitId]);

  return (
    <PageShell size="regular">
      <PageHeader
        title="Resumo da visita"
        description="Consulta somente leitura da visita e do diagnóstico salvo."
        backHref={`/companies/${params.companyId}`}
        backLabel="Voltar para empresa"
      />

      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}

      {isLoading ? (
        <LoadingState>Carregando visita...</LoadingState>
      ) : item ? (
        <>
          <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <dl className="grid gap-4 sm:grid-cols-2">
              <SummaryField label="Empresa" value={item.companyName} />
              <SummaryField label="Data" value={formatDateTime(item.visitDate)} />
              <SummaryField
                label="Responsável"
                value={item.responsibleName || "Responsável não informado"}
              />
              <SummaryField label="Tempo" value={formatDuration(item.durationMinutes)} />
              <SummaryField
                label="Status"
                value={item.diagnosisCompleted ? "Diagnóstico concluído" : "Diagnóstico pendente"}
              />
              <SummaryField label="Observações" value={item.notes || "Sem observações"} />
            </dl>
          </section>

          <section className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Diagnóstico
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">Respostas</h2>
            </div>
            <DiagnosisAnswerList answers={item.checklist} />
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Observações do diagnóstico
            </p>
            <p className="mt-2 whitespace-pre-wrap text-base leading-7 text-slate-950">
              {item.observations || "Sem observações do diagnóstico."}
            </p>
          </section>
        </>
      ) : null}
    </PageShell>
  );
}

type SummaryFieldProps = {
  label: string;
  value: string;
};

function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 break-words text-base leading-6 text-slate-950">{value}</dd>
    </div>
  );
}
