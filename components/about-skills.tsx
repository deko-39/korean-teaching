import { BookOpen, Globe, Heart, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SkillBar } from "@/components/skill-bar";
import { skills } from "@/lib/data";

const values = [
  {
    icon: Heart,
    title: "Lấy người học làm trung tâm",
    text: "Bài học được điều chỉnh theo mục tiêu, tốc độ và sở thích của bạn.",
  },
  {
    icon: Globe,
    title: "Văn hóa thực tế",
    text: "Ngôn ngữ được giảng dạy cùng phép lịch sự, ẩm thực và văn hóa Hàn.",
  },
  {
    icon: BookOpen,
    title: "Lộ trình rõ ràng",
    text: "Lộ trình đã được kiểm chứng từ Hangeul đến giao tiếp trôi chảy và TOPIK.",
  },
  {
    icon: Sparkles,
    title: "Luôn thú vị",
    text: "Trò chơi, phim ảnh và bài hát giúp duy trì động lực học tập.",
  },
];

export function AboutSkills() {
  return (
    <section id="about" className="scroll-mt-16 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          korean="선생님 소개"
          title="Người giáo viên giúp tiếng Hàn trở nên dễ hiểu"
          description="Tôi tin rằng ai cũng có thể học tiếng Hàn nếu có người hướng dẫn phù hợp. Phương pháp của tôi kết hợp nền tảng ngữ pháp vững chắc với thật nhiều luyện nói thực tế để bạn tự tin ngay từ ngày đầu tiên."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-foreground">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeachingStrengths() {
  return (
    <section id="skills" className="scroll-mt-16 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          korean="가르치는 실력"
          title="Thế mạnh giảng dạy"
          description="Nhiều năm kinh nghiệm giảng dạy trực tiếp và trực tuyến ở mọi trình độ."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-7 sm:grid-cols-2">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <SkillBar name={s.name} korean={s.korean} level={s.level} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
