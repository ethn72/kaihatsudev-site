"use client";

import { Button } from "@/components/ui/Button";
import { openKaiWidget } from "@/lib/utils";

/** Client wrapper so server sections can drop in a "talk to Kai" CTA. */
export function OpenKaiButton({
  children = "Chat with Kai",
  variant = "primary",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <Button variant={variant} onClick={() => openKaiWidget()}>
      {children}
    </Button>
  );
}
