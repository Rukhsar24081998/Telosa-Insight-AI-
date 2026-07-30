"use client";

import { Search, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
};

export function SearchInput({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Search…",
  className,
  "aria-label": ariaLabel = "Search",
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (next: string) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 size-3.5 -translate-y-1/2"
        aria-hidden
      />
      <Input
        type="search"
        value={currentValue}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="bg-background/45 border-border hover:border-telosa-blue/30 h-9 appearance-none rounded-lg pr-9 pl-9 text-xs shadow-inner transition-colors"
      />
      {currentValue ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="absolute top-1/2 right-1 -translate-y-1/2"
          onClick={() => handleChange("")}
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </Button>
      ) : null}
    </div>
  );
}
