type FeedbackMessageProps = {
  tone: "error" | "success";
  children: string;
};

const toneClassName = {
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function FeedbackMessage({ tone, children }: FeedbackMessageProps) {
  return (
    <p className={`rounded-md border px-4 py-3 text-sm leading-6 ${toneClassName[tone]}`}>
      {children}
    </p>
  );
}
