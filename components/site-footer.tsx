import { Mail, MessageCircle, Video } from "lucide-react";

const nav = [
  { href: "#about", label: "Giới thiệu" },
  { href: "#skills", label: "Thế mạnh" },
  { href: "#certifications", label: "Chứng chỉ" },
  { href: "#schedule", label: "Lịch học" },
  { href: "#booking", label: "Đặt lịch" },
];

const copyrightYear = new Intl.DateTimeFormat("en", {
  year: "numeric",
  timeZone: "UTC",
}).format(new Date());

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md bg-primary-foreground font-serif text-lg font-bold text-primary">
                한
              </span>
              <span className="font-serif text-lg font-bold">Khằng과 함께</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              Lớp học tiếng Hàn trực tiếp cùng giáo viên được chứng nhận. Từ
              những nét Hangeul đầu tiên đến giao tiếp trôi chảy, hãy cùng học
              nhé.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
              Khám phá
            </span>
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
              Kết nối
            </span>
            <div className="flex gap-2">
              {[
                { icon: MessageCircle, label: "KakaoTalk" },
                { icon: Video, label: "YouTube" },
                { icon: Mail, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            © {copyrightYear} Khằng과 함께 · Mrs. Khằng . All rights reserved
          </p>
          <p className="font-serif">감사합니다 · Cảm ơn bạn đã ghé thăm</p>
        </div>
      </div>
    </footer>
  );
}
