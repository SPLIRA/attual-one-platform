import Link from "next/link";
import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  backHref,
  backLabel = "Voltar",
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-start sm:justify-between sm:px-5">
      <div className="min-w-0">
        {backHref ? (
          <Link
            href={backHref}
            className="mb-3 inline-flex min-h-10 items-center text-sm font-semibold text-slate-600 underline-offset-4 hover:text-slate-950 hover:underline"
          >
            {backLabel}
          </Link>
        ) : null}
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-44">{actions}</div>
      ) : null}
    </header>
  );
}
