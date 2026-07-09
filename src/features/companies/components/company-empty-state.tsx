import Link from "next/link";

export function CompanyEmptyState() {
  return (
    <section className="rounded-md border border-slate-200 bg-white px-4 py-10 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Nenhuma empresa cadastrada.</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
        Cadastre a primeira empresa para usar o ATTUAL ONE Insight em uma visita real.
      </p>
      <Link
        href="/companies/new"
        className="mt-6 inline-flex min-h-14 items-center justify-center rounded-md bg-slate-950 px-6 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        Nova Empresa
      </Link>
    </section>
  );
}
