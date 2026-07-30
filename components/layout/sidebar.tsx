"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gauge,
  LayoutDashboard,
  MessagesSquare,
  PanelLeftClose,
  type LucideIcon,
} from "lucide-react";
import * as React from "react";

import { typography } from "@/lib/design-tokens";
import type { NavItem } from "@/types/ui";
import { cn } from "@/lib/utils";

const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Conversations",
    href: "/conversation",
    icon: MessagesSquare,
  },
  {
    label: "Business Impact",
    href: "/business-impact/CONV-009",
    icon: Gauge,
  },
];

type SidebarProps = {
  items?: NavItem[];
  className?: string;
  onNavigate?: () => void;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({
  items = defaultNavItems,
  className,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const conversationId =
    pathname.match(/^\/(?:conversation|business-impact)\/([^/]+)/)?.[1] ??
    "CONV-009";
  const resolvedItems =
    items === defaultNavItems
      ? items.map((item) =>
          item.label === "Business Impact"
            ? { ...item, href: `/business-impact/${conversationId}` }
            : item,
        )
      : items;

  return (
    <aside
      className={cn(
        "border-sidebar-border bg-sidebar/95 text-sidebar-foreground flex h-full flex-col border-r backdrop-blur-xl transition-[width] duration-200",
        collapsed ? "w-16" : "w-52",
        className,
      )}
      aria-label="Primary"
    >
      <div
        className={cn(
          "border-sidebar-border/80 flex h-14 items-center gap-2 border-b",
          collapsed ? "justify-center px-2" : "px-3",
        )}
      >
        <div className="from-telosa-blue to-telosa-purple text-telosa-blue-foreground shadow-telosa-blue/20 flex size-7 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold shadow-lg">
          TI
        </div>
        <div className={cn("min-w-0", collapsed && "hidden")}>
          <p className={cn(typography.appTitle, "text-xs")}>Telosa Insight</p>
          <p className="text-muted-foreground text-[9px]">
            Conversation Intelligence
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-2 pt-3">
        {resolvedItems.map((item) => {
          const Icon = (item.icon ?? LayoutDashboard) as LucideIcon;
          const active = isActivePath(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              aria-current={active ? "page" : undefined}
              aria-disabled={item.disabled || undefined}
              onClick={(event) => {
                if (item.disabled) {
                  event.preventDefault();
                  return;
                }
                onNavigate?.();
              }}
              className={cn(
                "flex h-9 items-center rounded-lg text-xs font-medium transition-all duration-200",
                collapsed ? "justify-center px-2" : "gap-2.5 px-3",
                active
                  ? "from-telosa-blue/35 to-telosa-purple/55 text-sidebar-accent-foreground ring-telosa-blue/30 bg-gradient-to-r shadow-[0_0_22px_rgb(99_102_241/0.18)] ring-1"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                item.disabled && "cursor-default",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden />
              <span className={cn("truncate", collapsed && "hidden")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-sidebar-border space-y-1 border-t p-2">
        <div
          className={cn(
            "border-sidebar-border bg-background/35 flex items-center rounded-lg border",
            collapsed ? "justify-center p-2" : "gap-2 p-2.5",
          )}
        >
          <div className="bg-secondary text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold">
            RK
          </div>
          <div className={cn("min-w-0 flex-1", collapsed && "hidden")}>
            <p className="truncate text-[10px] font-semibold text-slate-100">
              Rukhsar Khan
            </p>
            <p className="text-muted-foreground truncate text-[9px]">CX Head</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((current) => !current)}
          className={cn(
            "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-telosa-blue/40 flex h-8 w-full items-center rounded-lg text-[10px] transition-colors focus-visible:ring-2",
            collapsed ? "justify-center" : "gap-2 px-2",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeftClose
            className={cn(
              "size-3.5 transition-transform",
              collapsed && "rotate-180",
            )}
            aria-hidden
          />
          <span className={cn(collapsed && "hidden")}>Collapse</span>
        </button>
      </div>
    </aside>
  );
}
