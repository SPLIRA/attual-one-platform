"use client";

import { useState } from "react";

import type { CompanyFormInput } from "../types";

type CompanyFormProps = {
  initialValues: CompanyFormInput;
  submitLabel: string;
  isSaving: boolean;
  onSubmit: (input: CompanyFormInput) => Promise<void>;
};

export function CompanyForm({ initialValues, submitLabel, isSaving, onSubmit }: CompanyFormProps) {
  const [form, setForm] = useState<CompanyFormInput>(initialValues);
  const [error, setError] = useState<string | null>(null);

  function updateField(field: keyof CompanyFormInput, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Informe o nome da empresa.");
      return;
    }

    if (!form.city.trim()) {
      setError("Informe a cidade.");
      return;
    }

    try {
      await onSubmit(form);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Nao foi possivel salvar a empresa.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Nome da empresa *</span>
        <input
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          autoComplete="organization"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Segmento</span>
        <input
          value={form.segment}
          onChange={(event) => updateField("segment", event.target.value)}
          className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-800">Telefone</span>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            inputMode="tel"
            autoComplete="tel"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-800">WhatsApp</span>
          <input
            value={form.whatsapp}
            onChange={(event) => updateField("whatsapp", event.target.value)}
            className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            inputMode="tel"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Instagram</span>
        <input
          value={form.instagram}
          onChange={(event) => updateField("instagram", event.target.value)}
          className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          inputMode="url"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Site</span>
        <input
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
          className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          inputMode="url"
          autoComplete="url"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Endereco</span>
        <input
          value={form.address}
          onChange={(event) => updateField("address", event.target.value)}
          className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          autoComplete="street-address"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Cidade *</span>
        <input
          value={form.city}
          onChange={(event) => updateField("city", event.target.value)}
          className="min-h-12 rounded-md border border-slate-300 px-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          autoComplete="address-level2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Observacoes</span>
        <textarea
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          className="min-h-32 rounded-md border border-slate-300 px-3 py-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
        />
      </label>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-2 inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSaving ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}
