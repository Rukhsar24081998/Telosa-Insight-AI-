import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardWrapperProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export function CardWrapper({
  children,
  className,
  interactive = false,
  selected = false,
  onClick,
}: CardWrapperProps) {
  return (
    <Card
      data-selected={selected || undefined}
      className={cn(
        "border-border/70 bg-card/95 shadow-[var(--shadow-card)] transition-[background-color,border-color,box-shadow,transform] duration-200",
        interactive &&
          "hover:border-telosa-blue/20 hover:bg-card focus-visible:ring-telosa-blue/40 cursor-pointer hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] focus-visible:ring-2",
        selected &&
          "border-telosa-blue/40 bg-telosa-blue-muted/40 ring-telosa-blue/20 ring-1",
        className,
      )}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive && onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </Card>
  );
}

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
