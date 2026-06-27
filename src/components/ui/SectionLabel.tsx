import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/** Small uppercase label with a Beni accent bar — used above each section. */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="h-px w-10 bg-beni" aria-hidden="true" />
      <span className="font-syne text-xs font-bold uppercase tracking-[0.25em] text-beni-light">
        {children}
      </span>
    </div>
  );
}
