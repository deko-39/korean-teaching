import Image from "next/image";
import { GraduationCap, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="hanji relative flex min-h-screen min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="animate-fade-up order-2 lg:order-1">
          <span className="animate-blink-soft inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            Đang nhận học viên
          </span>

          <h1 className="mt-5 text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="inline-block whitespace-nowrap">재미있게</span>{" "}
            <span className="inline-block whitespace-nowrap">
              배우는 한국어
            </span>{" "}
            <span className="mt-2 block text-2xl font-medium text-muted-foreground sm:text-3xl">
              Học tiếng Hàn theo cách đầy hứng khởi.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Xin chào, tôi là{" "}
            <strong className="font-semibold text-foreground">Khằng</strong> —
            giáo viên tiếng Hàn với hơn 5 năm đồng hành cùng học viên từ những
            nét <span className="font-serif text-foreground">한글</span> đầu
            tiên đến giao tiếp trôi chảy và chinh phục <strong>TOPIK</strong>.
            Tôi có các lớp học online, nhóm nhỏ và lộ trình được thiết kế dành
            riêng cho bạn.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              render={<a href="#booking" />}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Đặt buổi học thử miễn phí
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#schedule" />}
              size="lg"
              variant="outline"
            >
              Xem lịch học
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { icon: Users, value: "100+", label: "Học viên đã giảng dạy" },
              { icon: Star, value: "4.9/5", label: "Đánh giá TB" },
              { icon: GraduationCap, value: "5 năm", label: "Kinh nghiệm" },
            ].map((s) => (
              <div key={s.label}>
                <s.icon className="size-5 text-accent" />
                <dd className="mt-1.5 font-serif text-2xl font-bold text-foreground">
                  {s.value}
                </dd>
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Profile image */}
        <div className="animate-fade-in order-1 flex justify-center lg:order-2">
          <div className="relative">
            <div
              aria-hidden="true"
              className="animate-float-slow absolute -left-6 -top-6 -z-10 size-full rounded-[2rem] border-2 border-accent/30"
            />
            <div
              aria-hidden="true"
              className="absolute -right-4 bottom-8 -z-10 size-24 rounded-full bg-gold/20 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-card shadow-xl ring-1 ring-border">
              <Image
                src="/images/teacher-profile.png"
                alt="Jiyeon Park, giáo viên tiếng Hàn được chứng nhận, đang mỉm cười"
                width={460}
                height={560}
                priority
                className="h-[360px] w-[300px] object-cover sm:h-[460px] sm:w-[380px]"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 shadow-lg">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary font-serif text-xs font-bold text-primary-foreground">
                한
              </span>
              <span className="text-sm font-medium text-foreground">
                Chứng nhận · TOPIK 6
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
