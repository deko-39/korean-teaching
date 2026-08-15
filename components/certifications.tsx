"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Award, BadgeCheck, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { certifications } from "@/lib/data";

export function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState<
    (typeof certifications)[number] | null
  >(null);

  useEffect(() => {
    if (!selectedCertification) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCertification(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCertification]);

  return (
    <>
      <section
        id="certifications"
        className="hanji scroll-mt-16 border-y border-border py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            korean="자격 & 학력"
            title="Hồ sơ năng lực"
            description="Đủ chuyên môn, được kiểm chứng và luôn tiếp tục học hỏi để bạn học cùng một người thật sự chuyên nghiệp."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <button
                  type="button"
                  onClick={() => setSelectedCertification(c)}
                  className="group relative flex h-full w-full cursor-pointer gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`Xem hình ảnh cho chứng nhận ${c.title}`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-3 -top-3 flex size-16 items-center justify-center rounded-full border-2 border-accent/40 font-serif text-[10px] font-bold uppercase tracking-wide text-accent/50 opacity-0 transition-opacity duration-500 group-hover:animate-stamp group-hover:opacity-100"
                  >
                    인증
                  </span>

                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Award className="size-6" />
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold leading-snug text-foreground">
                        {c.title}
                      </h3>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-accent">
                      <BadgeCheck className="size-4" />
                      {c.issuer}
                      <span className="text-muted-foreground">· {c.year}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {c.detail}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                      Nhấn để xem chứng từ
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {selectedCertification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/55 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certification-modal-title"
          onClick={() => setSelectedCertification(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-border bg-background p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCertification(null)}
              className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary"
              aria-label="Đóng hộp thoại chứng nhận"
            >
              <X className="size-5" />
            </button>

            <div className="pr-12">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Hồ sơ xác thực
              </p>
              <h3
                id="certification-modal-title"
                className="mt-2 font-serif text-2xl font-bold text-foreground"
              >
                {selectedCertification.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedCertification.issuer} · {selectedCertification.year}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {selectedCertification.detail}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {selectedCertification.images.map((imagePath, index) => (
                <figure
                  key={imagePath}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="relative aspect-[4/3] w-full bg-muted/40">
                    <Image
                      src={imagePath}
                      alt={`${selectedCertification.title} image ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
