import Link from "next/link";

import type { VisitHistoryItem } from "../types";

type HistoryCardProps = {
  item: VisitHistoryItem;
};

export function HistoryCard({ item }: HistoryCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">
            📅 {formatDateTime(item.visitDate)}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {item.responsibleName || "Responsável não informado"}
          </p>
        </div>
        <span className="inline-flex w-fit rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
          {item.diagnosisCompleted ? "Diagnóstico concluído" : "Diagnóstico pendente"}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-slate-500">Tempo</dt>
          <dd className="mt-1 text-slate-950">{formatDuration(item.durationMinutes)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Status</dt>
          <dd className="mt-1 text-slate-950">
            {item.diagnosisCompleted ? "Concluído" : "Em aberto"}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Observações</dt>
          <dd className="mt-1 line-clamp-2 text-slate-950">{item.notes || "Sem observações"}</dd>
        </div>
      </dl>

      <Link
        href={`/companies/${item.companyId}/visit/${item.id}`}
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 sm:w-auto"
      >
        Abrir resumo
      </Link>
    </article>
  );
}

export function formatDateTime(value: string | null) {
  if (!value) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDuration(value: number | null) {
  return value ? `${value} min` : "Tempo não informado";
}
