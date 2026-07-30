"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { FilterOption } from "@/types/ui";
import { cn } from "@/lib/utils";

type FilterDropdownProps = {
  label: string;
  options: FilterOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  triggerClassName?: string;
};

export function FilterDropdown({
  label,
  options,
  value,
  defaultValue,
  placeholder = "All",
  onValueChange,
  className,
  triggerClassName,
}: FilterDropdownProps) {
  const selectedLabel =
    options.find((option) => option.value === (value ?? defaultValue))?.label ??
    placeholder;

  return (
    <div className={cn("min-w-0", className)}>
      <label className="sr-only">{label}</label>
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => {
          if (typeof next === "string") {
            onValueChange?.(next);
          }
        }}
      >
        <SelectTrigger
          className={cn(
            "border-border bg-background/45 hover:border-telosa-blue/30 h-9! w-full rounded-lg px-3 py-0 text-xs transition-colors",
            triggerClassName,
          )}
          aria-label={label}
        >
          <span
            data-slot="select-value"
            className="min-w-0 flex-1 truncate text-left"
          >
            {selectedLabel}
          </span>
        </SelectTrigger>
        <SelectContent align="start" alignItemWithTrigger={false}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
