"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors",
  {
    variants: {
      tone: {
        default:
          "hover:border-foreground/15 hover:text-foreground",
        violet:
          "border-violet-500/25 bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:border-violet-500/50 hover:text-violet-800 dark:hover:text-violet-200",
        blue:
          "border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:border-blue-500/50 hover:text-blue-800 dark:hover:text-blue-200",
      },
    },
    defaultVariants: { tone: "default" },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export function Tag({ className, tone, ...props }: TagProps) {
  return <span className={cn(tagVariants({ tone }), className)} {...props} />;
}

const statusVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        live:
          "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/25",
        active:
          "bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-1 ring-inset ring-violet-500/25",
        beta:
          "bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-500/25",
        exploring:
          "bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-1 ring-inset ring-amber-500/30",
        shipped:
          "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/25",
        planned:
          "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300 ring-1 ring-inset ring-zinc-500/25",
        concept:
          "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300 ring-1 ring-inset ring-zinc-500/25",
        archived:
          "bg-red-500/10 text-red-700 dark:text-red-300 ring-1 ring-inset ring-red-500/25",
      },
    },
  }
);

export function StatusPill({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        statusVariants({ status: status as never }),
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
