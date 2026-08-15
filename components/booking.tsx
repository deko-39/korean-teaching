"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { classes, levelLabels } from "@/lib/data";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const classOptions = classes.filter(
    (currentClass, index, allClasses) =>
      allClasses.findIndex(
        (candidate) => candidate.title === currentClass.title,
      ) === index,
  );

  const handleRequiredInvalid = (
    event: React.InvalidEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const fieldName = event.currentTarget.name;

    if (fieldName === "email") {
      event.currentTarget.setCustomValidity(
        "Vui lòng nhập địa chỉ email hợp lệ",
      );
      return;
    }

    if (fieldName === "class") {
      event.currentTarget.setCustomValidity("Vui lòng chọn một lớp học");
      return;
    }

    event.currentTarget.setCustomValidity("Trường này bắt buộc điền");
  };

  const resetRequiredValidity = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    event.currentTarget.setCustomValidity("");
  };

  useEffect(() => {
    const resetFormState = () => {
      setSubmitted(false);
      setSubmitError(null);
      setIsSubmitting(false);
      formRef.current?.reset();
    };

    resetFormState();
    window.addEventListener("pageshow", resetFormState);

    return () => {
      window.removeEventListener("pageshow", resetFormState);
    };
  }, []);

  return (
    <section id="booking" className="scroll-mt-16 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-2">
          {/* Left: pitch */}
          <div className="hanji flex flex-col justify-center gap-6 border-b border-border p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <Reveal>
              <span className="font-serif text-sm font-semibold text-accent">
                수업 예약
              </span>
              <h2 className="mt-2 text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Bắt đầu hành trình tiếng Hàn của bạn
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Đặt chỗ học thử miễn phí{" "}
                <span className="font-bold">3 buổi</span>. Chúng ta sẽ kiểm tra
                trình độ, trao đổi mục tiêu và tìm lớp phù hợp nhất. Không áp
                lực, chỉ cần{" "}
                <span className="font-serif text-foreground">화이팅!</span>
              </p>
            </Reveal>

            <Reveal delay={100} className="space-y-3">
              {[
                "Đánh giá trình độ miễn phí",
                "Lịch học linh hoạt (chủ yếu buổi tối)",
                "Đã bao gồm tài liệu",
              ].map((f) => (
                <p
                  key={f}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <CheckCircle2 className="size-5 text-jade" />
                  {f}
                </p>
              ))}
            </Reveal>

            <Reveal delay={150} className="flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:hangkhuat18@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
              >
                <Mail className="size-4 text-accent" />
                Gửi email
              </a>
              <a
                href="https://www.facebook.com/hang.khuat.94"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
              >
                <MessageCircle className="size-4 text-accent" />
                Facebook: @hang.khuat.94
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="p-8 sm:p-10">
            {submitted ? (
              <div className="animate-fade-up flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-jade/15 text-jade">
                  <CheckCircle2 className="size-8" />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-bold text-foreground">
                  신청 완료! Đã gửi yêu cầu
                </h3>
                <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
                  Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi trong vòng 24 giờ để
                  sắp xếp buổi học thử miễn phí. 감사합니다!
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Gửi yêu cầu khác
                </Button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={async (e) => {
                  e.preventDefault();

                  if (isSubmitting) {
                    return;
                  }

                  setIsSubmitting(true);
                  setSubmitError(null);

                  const formData = new FormData(e.currentTarget);
                  const payload = {
                    name: String(formData.get("name") ?? "").trim(),
                    email: String(formData.get("email") ?? "").trim(),
                    className: String(formData.get("class") ?? "").trim(),
                    message: String(formData.get("message") ?? "").trim(),
                  };

                  try {
                    const response = await fetch("/api/booking", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                      const result = (await response
                        .json()
                        .catch(() => null)) as { error?: string } | null;

                      throw new Error(
                        result?.error ?? "Không thể gửi yêu cầu lúc này",
                      );
                    }

                    setSubmitted(true);
                  } catch (error) {
                    setSubmitError(
                      error instanceof Error
                        ? error.message
                        : "Không thể gửi yêu cầu lúc này",
                    );
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Họ và tên" name="name">
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Tên của bạn"
                      className="input-base"
                      onInvalid={handleRequiredInvalid}
                      onInput={resetRequiredValidity}
                    />
                  </Field>
                  <Field label="Địa chỉ email" name="email">
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      className="input-base"
                      onInvalid={handleRequiredInvalid}
                      onInput={resetRequiredValidity}
                    />
                  </Field>
                </div>

                <Field label="Lớp mong muốn" name="class">
                  <select
                    required
                    name="class"
                    className="input-base"
                    defaultValue=""
                    onInvalid={handleRequiredInvalid}
                    onInput={resetRequiredValidity}
                  >
                    <option value="" disabled>
                      Chọn một lớp…
                    </option>
                    {classOptions.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({levelLabels[c.level]})
                      </option>
                    ))}
                    <option value="not-sure">
                      Chưa chắc — hãy tư vấn giúp tôi
                    </option>
                  </select>
                </Field>

                <Field label="Lời nhắn" name="message">
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Hãy cho tôi biết mục tiêu và trình độ hiện tại của bạn…"
                    className="input-base resize-none"
                  />
                </Field>

                {submitError ? (
                  <p className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent">
                    {submitError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isSubmitting
                    ? "Đang gửi yêu cầu..."
                    : "Gửi yêu cầu học thử miễn phí"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Bằng việc gửi biểu mẫu này, bạn đã đồng ý về việc chia sẻ
                  thông tin với chúng tôi
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
