"use client";

import { useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";

import { diagnosisQuestions } from "../checklist";
import type { CreateDiagnosisInput, DiagnosisAnswer, DiagnosisAnswers } from "../types";

type DiagnosisChecklistFormProps = {
  companyId: string;
  visitId: string;
  isSaving: boolean;
  onBack: () => void;
  onSubmit: (input: CreateDiagnosisInput) => Promise<void>;
};

const answerOptions: Array<{
  value: DiagnosisAnswer;
  label: string;
}> = [
  { value: "yes", label: "✅ Sim" },
  { value: "partial", label: "🟡 Parcialmente" },
  { value: "no", label: "❌ Não" },
];

const questionsBySection = diagnosisQuestions.reduce<Record<string, typeof diagnosisQuestions>>(
  (sections, question) => {
    sections[question.section] = [...(sections[question.section] ?? []), question];

    return sections;
  },
  {},
);

export function DiagnosisChecklistForm({
  companyId,
  visitId,
  isSaving,
  onBack,
  onSubmit,
}: DiagnosisChecklistFormProps) {
  const [answers, setAnswers] = useState<DiagnosisAnswers>({});
  const [observations, setObservations] = useState("");
  const [error, setError] = useState<string | null>(null);

  function updateAnswer(questionId: string, answer: DiagnosisAnswer) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setError(null);

    const hasMissingAnswer = diagnosisQuestions.some((question) => !answers[question.id]);

    if (hasMissingAnswer) {
      setError("Responda todas as perguntas antes de salvar o diagnóstico.");
      return;
    }

    try {
      await onSubmit({
        companyId,
        visitId,
        answers,
        observations,
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível salvar o diagnóstico.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error ? <FeedbackMessage tone="error">{error}</FeedbackMessage> : null}

      {Object.entries(questionsBySection).map(([section, questions]) => (
        <section key={section} className="rounded-md border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-lg font-semibold text-slate-950">{section}</h2>
          </div>

          <div className="divide-y divide-slate-200">
            {questions.map((question) => (
              <fieldset key={question.id} className="px-4 py-5">
                <legend className="text-base font-medium text-slate-950">
                  {diagnosisQuestions.findIndex((item) => item.id === question.id) + 1}.{" "}
                  {question.question}
                </legend>

                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {answerOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateAnswer(question.id, option.value)}
                      className={
                        answers[question.id] === option.value
                          ? "min-h-14 rounded-md bg-slate-950 px-4 text-base font-semibold text-white"
                          : "min-h-14 rounded-md border border-slate-300 bg-white px-4 text-base font-semibold text-slate-800"
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </section>
      ))}

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-800">Observações do diagnóstico</span>
        <textarea
          value={observations}
          onChange={(event) => setObservations(event.target.value)}
          className="min-h-36 rounded-md border border-slate-300 px-3 py-3 text-base outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSaving}
          className="inline-flex min-h-14 items-center justify-center rounded-md border border-slate-300 px-5 text-base font-semibold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:text-slate-400"
        >
          Voltar
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex min-h-14 items-center justify-center rounded-md bg-slate-950 px-5 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSaving ? "Salvando..." : "Salvar Diagnóstico"}
        </button>
      </div>
    </form>
  );
}
