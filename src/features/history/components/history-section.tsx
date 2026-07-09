"use client";

import { useEffect, useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";
import { LoadingState } from "@/components/ui/loading-state";

import { listCompanyVisitHistory } from "../services/history-service";
import type { VisitHistoryItem } from "../types";
import { HistoryCard } from "./history-card";

type HistorySectionProps = {
  companyId: string;
};

export function HistorySection({ companyId }: HistorySectionProps) {
  const [items, setItems] = useState<VisitHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        setIsLoading(true);
        setError(null);
        setItems(await listCompanyVisitHistory(companyId));
      } catch (loadError) {
        setError(
          loadError instanceof Error ? loadError.message : "Não foi possível carregar o histórico.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadHistory();
  }, [companyId]);

  return (
    <section id="historico" className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Histórico</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-950">Visitas da empresa</h2>
      </div>

      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}

      {isLoading ? (
        <LoadingState>Carregando histórico...</LoadingState>
      ) : items.length === 0 ? (
        <section className="rounded-md border border-slate-200 bg-white px-4 py-8 text-sm text-slate-600 shadow-sm">
          Nenhuma visita registrada.
        </section>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
