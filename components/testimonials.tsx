"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/data";

const ITEMS_PER_PAGE = 3;
const AUTO_SLIDE_MS = 3000;

const getTestimonialRating = (seed: string) => {
  const total = seed
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return total % 2 === 0 ? 4 : 5;
};

export function Testimonials() {
  const pages = useMemo(() => {
    const result = [];

    for (let index = 0; index < testimonials.length; index += ITEMS_PER_PAGE) {
      result.push(testimonials.slice(index, index + ITEMS_PER_PAGE));
    }

    return result;
  }, []);

  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (pages.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActivePage((current) => (current + 1) % pages.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(intervalId);
  }, [pages.length]);

  const goToPrevious = () => {
    setActivePage((current) =>
      current === 0 ? pages.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActivePage((current) => (current + 1) % pages.length);
  };

  return (
    <section className="hanji scroll-mt-16 border-y border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          korean="학생 후기"
          title="Học viên nói gì"
          description="Những câu chuyện thật từ học viên ở nhiều nơi."
        />

        <Reveal delay={100}>
          <div className="mt-14">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activePage * 100}%)` }}
              >
                {pages.map((page, pageIndex) => (
                  <div key={pageIndex} className="w-full shrink-0 px-2 sm:px-3">
                    <div className="grid gap-6 md:grid-cols-3">
                      {page.map((t) => {
                        const rating = getTestimonialRating(t.name);

                        return (
                          <figure
                            key={t.id}
                            className="flex min-h-[270px] h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:min-h-[290px] sm:p-6"
                          >
                            <Quote className="size-6 text-accent/40" />
                            <blockquote className="mt-2.5 flex-1 whitespace-pre-line text-pretty text-base leading-relaxed text-foreground sm:text-[17px]">
                              {t.quote}
                            </blockquote>
                            <div className="mt-4 flex items-center gap-1 text-gold">
                              {Array.from({ length: 5 }).map((_, s) => (
                                <Star
                                  key={s}
                                  className={
                                    s < rating
                                      ? "size-3.5 fill-current"
                                      : "size-3.5 text-gold/35"
                                  }
                                />
                              ))}
                            </div>
                            <figcaption className="mt-3.5">
                              <span className="font-semibold text-foreground">
                                {t.name}
                              </span>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {t.role}
                              </span>
                            </figcaption>
                          </figure>
                        );
                      })}

                      {Array.from({ length: ITEMS_PER_PAGE - page.length }).map(
                        (_, emptyIndex) => (
                          <div
                            key={`empty-${pageIndex}-${emptyIndex}`}
                            className="hidden md:block"
                            aria-hidden="true"
                          />
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={goToPrevious}
                  aria-label="Xem đánh giá trước"
                  className="rounded-full"
                >
                  <ChevronLeft className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={goToNext}
                  aria-label="Xem đánh giá tiếp theo"
                  className="rounded-full"
                >
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>

              <div className="flex items-center gap-1.5">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActivePage(index)}
                    className={
                      index === activePage
                        ? "h-2 w-6 rounded-full bg-accent transition-all"
                        : "h-2 w-2 rounded-full bg-border transition-all hover:bg-accent/50"
                    }
                    aria-label={`Xem nhóm đánh giá ${index + 1}`}
                    aria-current={index === activePage}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
