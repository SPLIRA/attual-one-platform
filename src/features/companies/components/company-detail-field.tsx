type CompanyDetailFieldProps = {
  label: string;
  value: string | null;
  href?: string;
};

export function CompanyDetailField({ label, value, href }: CompanyDetailFieldProps) {
  const displayValue = value || "Nao informado";

  return (
    <div className="rounded-md border border-slate-200 bg-white px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-base text-slate-950">
        {href && value ? (
          <a
            href={href}
            className="underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {displayValue}
          </a>
        ) : (
          displayValue
        )}
      </dd>
    </div>
  );
}
