import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  size?: "narrow" | "regular" | "wide";
};

const sizeClassName = {
  narrow: "max-w-2xl",
  regular: "max-w-4xl",
  wide: "max-w-6xl",
};

export function PageShell({ children, size = "regular" }: PageShellProps) {
  return (
    <main
      className={`mx-auto flex min-h-dvh w-full ${sizeClassName[size]} flex-col gap-6 px-4 py-5 sm:px-6 sm:py-8 lg:px-8`}
    >
      {children}
    </main>
  );
}
