type StatusBadgeProps = {
  status: string | null;
};

const statusLabels: Record<string, string> = {
  active: "Ativa",
  inactive: "Inativa",
  prospect: "Prospect",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status ?? "active";

  return (
    <span className="inline-flex w-fit items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
      {statusLabels[normalizedStatus] ?? normalizedStatus}
    </span>
  );
}
