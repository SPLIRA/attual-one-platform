type LoadingStateProps = {
  children: string;
};

export function LoadingState({ children }: LoadingStateProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white px-4 py-8 text-sm text-slate-600 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 animate-pulse rounded-full bg-slate-400" />
        {children}
      </div>
    </section>
  );
}
