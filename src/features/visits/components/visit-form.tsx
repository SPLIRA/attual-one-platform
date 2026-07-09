"use client";

import { useMemo, useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";

import type { CreateVisitInput, VisitDurationMinutes } from "../types";

type VisitFormProps = {
  companyId: string;
  companyName: string;
  isSaving: boolean;
  onCancel: () => void;
  onSubmit: (input: CreateVisitInput) => Promise<void>;
};

const durationOptions: VisitDurationMinutes[] = [15, 30, 45, 60];

export function VisitForm({
  companyId,
  companyName,
  isSaving,
  onCancel,
  onSubmit,
}: VisitFormProps) {
  const visitDate = useMemo(() => new Date().toISOString(), []);
  const [responsibleName, setResponsibleName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState<VisitDurationMinutes>(30);
  const [initialNotes, setInitialNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!responsibleName.trim()) {
      setError("Informe o responsavel pela visita.");
      return;
    }

    try {
      await onSubmit({
        companyId,
        companyName,
        visitDate,
        responsibleName,
        durationMinutes,
        initialNotes,
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Nao foi possivel iniciar a visita.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-5">
        {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-800">Empresa</span>
          <input
            value={companyName}
            readOnly
            className="min-h-12 rounded-md border border-slate-200 bg-slate-100 px-3 text-base text-slate-700"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-800">Data</span>
          <input
            value={formatDateTime(visitDate)}
            readOnly
            className="min-h-12 rounded-md border border-slate-200 bg-slate-100 px-3 text-base text-slate-700"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-800">Responsavel pela visita *</span>
          <input
            value={responsibleName}
            onChange={(event) => setResponsibleName(event.target.value)}
            className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            autoComplete="name"
          />
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-slate-800">Tempo previsto</legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {durationOptions.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => setDurationMinutes(duration)}
                className={
                  durationMinutes === duration
                    ? "min-h-14 rounded-md bg-slate-950 px-4 text-base font-semibold text-white"
                    : "min-h-14 rounded-md border border-slate-300 bg-white px-4 text-base font-semibold text-slate-800"
                }
              >
                {duration} min
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-800">Observacoes iniciais</span>
          <textarea
            value={initialNotes}
            onChange={(event) => setInitialNotes(event.target.value)}
            className="min-h-32 rounded-md border border-slate-300 px-3 py-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="inline-flex min-h-14 items-center justify-center rounded-md border border-slate-300 px-5 text-base font-semibold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:text-slate-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex min-h-14 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? "Salvando..." : "Iniciar Diagnóstico"}
          </button>
        </div>
      </div>
    </form>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
