"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#about", label: "Giới thiệu", korean: "소개" },
  { href: "#certifications", label: "Chứng chỉ", korean: "자격" },
  { href: "#skills", label: "Thế mạnh", korean: "실력" },
  { href: "#schedule", label: "Lịch học", korean: "시간표" },
  { href: "#booking", label: "Đặt lịch", korean: "예약" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="Trang chủ"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-primary font-serif text-lg font-bold text-primary-foreground">
            한
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-base font-bold text-foreground">
              함께 한국어
            </span>
            <span className="text-[11px] tracking-wide text-muted-foreground">
              cùng Khằng
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <ThemeToggle className="ml-1" />
          <Button
            nativeButton={false}
            render={<a href="#booking" />}
            className="ml-1 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Đặt lịch học
          </Button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "grid overflow-hidden bg-background/95 backdrop-blur-md transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden",
          open
            ? "grid-rows-[1fr] border-t border-border opacity-100"
            : "grid-rows-[0fr] border-t border-transparent opacity-0",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex min-h-0 max-w-6xl flex-col px-4 py-3 transition-transform duration-300 ease-out",
            open ? "translate-y-0" : "-translate-y-2",
          )}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex gap-2 items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>{l.label}</span>
              <span className="font-serif text-sm text-muted-foreground">
                {l.korean}
              </span>
            </a>
          ))}
          <Button
            nativeButton={false}
            render={<a href="#booking" onClick={() => setOpen(false)} />}
            className="mt-2 w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Đặt lịch học
          </Button>
        </nav>
      </div>
    </header>
  );
}
