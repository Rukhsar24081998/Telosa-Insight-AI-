"use client";

import { Menu } from "lucide-react";
import * as React from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { BreadcrumbItem, NavItem } from "@/types/ui";
import { cn } from "@/lib/utils";

type AppLayoutProps = {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  headerActions?: React.ReactNode;
  insightPanel?: React.ReactNode;
  navItems?: NavItem[];
  className?: string;
  mainClassName?: string;
};

export function AppLayout({
  children,
  title,
  breadcrumbs,
  headerActions,
  insightPanel,
  navItems,
  className,
  mainClassName,
}: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const mobileNavigation = (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Open navigation"
          />
        }
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <Sidebar
          items={navItems}
          className="h-full w-full border-0"
          onNavigate={() => setMobileOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
  const hasDesktopHeader =
    Boolean(title) || Boolean(breadcrumbs?.length) || Boolean(headerActions);

  return (
    <div className={cn("bg-background flex min-h-screen", className)}>
      <div className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:shrink-0">
        <Sidebar items={navItems} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {hasDesktopHeader ? (
          <Header
            title={title}
            breadcrumbs={breadcrumbs}
            actions={headerActions}
            leading={mobileNavigation}
          />
        ) : (
          <div className="lg:hidden">
            <Header leading={mobileNavigation} />
          </div>
        )}

        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col xl:flex-row",
            mainClassName,
          )}
        >
          <main className="min-w-0 flex-1">{children}</main>

          {insightPanel ? (
            <aside
              className="border-border/70 bg-card/70 border-t backdrop-blur-sm xl:w-80 xl:shrink-0 xl:border-t-0 xl:border-l"
              aria-label="Insights"
            >
              <div className="xl:sticky xl:top-16 xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto">
                {insightPanel}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
