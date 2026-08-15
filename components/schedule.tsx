"use client";

import { useMemo, useState } from "react";
import { Clock, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  classes,
  formatLabels,
  levelColor,
  levelLabels,
  scheduleFilters,
  type ScheduleFilter,
  weekDays,
} from "@/lib/data";

export function Schedule() {
  const [filter, setFilter] = useState<ScheduleFilter>("All");

  const visible = useMemo(
    () =>
      (filter === "All" ? classes : classes.filter((c) => c.level === filter))
        .slice()
        .sort((left, right) => left.start.localeCompare(right.start)),
    [filter],
  );

  return (
    <section id="schedule" className="scroll-mt-16 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          korean="주간 시간표"
          title="Lịch học trực tiếp tuần này"
          description="Tất cả thời gian hiển thị theo giờ Việt Nam (ICT). Hãy chọn lớp phù hợp với trình độ và thời gian của bạn, số chỗ có hạn."
        />

        {/* Filters */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {scheduleFilters.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === value
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </Reveal>

        {/* Weekly grid */}
        <Reveal className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {weekDays.map((day) => {
              const dayClasses = visible.filter((c) => c.day === day.value);
              return (
                <div key={day.value} className="flex flex-col">
                  <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
                    <span className="flex size-7 items-center justify-center rounded-md bg-primary font-serif text-sm font-bold text-primary-foreground">
                      {day.korean}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {day.label}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3">
                    {dayClasses.length === 0 ? (
                      <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                        Không có lớp
                      </p>
                    ) : (
                      dayClasses.map((c) => (
                        <article
                          key={c.id}
                          className="group rounded-xl border border-border bg-card p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                        >
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                              levelColor[c.level],
                            )}
                          >
                            {levelLabels[c.level]}
                          </span>
                          <h3 className="mt-2 text-sm font-bold leading-snug text-foreground">
                            {c.title}
                          </h3>
                          <p className="font-serif text-xs text-muted-foreground">
                            {c.korean}
                          </p>
                          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3.5" />
                            {c.start}–{c.end}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            {c.format === "1:1" ? (
                              <User className="size-3.5" />
                            ) : (
                              <Users className="size-3.5" />
                            )}
                            {formatLabels[c.format]}
                            <span
                              className={cn(
                                "ml-auto font-medium",
                                c.seatsLeft <= 2 ? "text-accent" : "text-jade",
                              )}
                            >
                              Còn {c.seatsLeft} chỗ
                            </span>
                          </p>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <Button
            nativeButton={false}
            render={<a href="#booking" />}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Giữ chỗ ngay
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
