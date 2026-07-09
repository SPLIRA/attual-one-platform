import type { VisitDiagnosisAnswer } from "../types";

type DiagnosisAnswerListProps = {
  answers: VisitDiagnosisAnswer[];
};

const answerLabels = {
  yes: "✅ Sim",
  partial: "🟡 Parcialmente",
  no: "❌ Não",
};

export function DiagnosisAnswerList({ answers }: DiagnosisAnswerListProps) {
  if (answers.length === 0) {
    return (
      <section className="rounded-md border border-slate-200 bg-white px-4 py-8 text-sm text-slate-600 shadow-sm">
        Diagnóstico ainda não concluído.
      </section>
    );
  }

  return (
    <div className="grid gap-3">
      {answers.map((answer, index) => (
        <article
          key={answer.id}
          className="rounded-md border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {answer.section}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-medium text-slate-950">
              {index + 1}. {answer.question}
            </p>
            <span className="inline-flex min-h-10 w-fit items-center rounded-md bg-slate-100 px-3 text-sm font-semibold text-slate-800">
              {answerLabels[answer.answer]}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
