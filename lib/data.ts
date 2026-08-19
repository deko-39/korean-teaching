export type Level = "Beginner1A" | "Beginner1B" | "Intermediate1A";

export type ScheduleFilter = Level | "All";

export type ClassSession = {
  id: string;
  title: string;
  korean: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  start: string; // "18:00"
  end: string;
  level: Level;
  seatsLeft: number;
  format: "1:1" | "Group";
};

export const levelColor: Record<Level, string> = {
  Beginner1A: "bg-jade/15 text-jade border-jade/30",
  Beginner1B: "bg-primary/15 text-primary border-primary/30",
  Intermediate1A: "bg-gold/20 text-gold border-gold/40",
};

export const levelLabels: Record<Level, string> = {
  Beginner1A: "Sơ cấp 1A",
  Beginner1B: "Sơ cấp 1B",
  Intermediate1A: "Trung cấp 1A",
};

export const scheduleFilters: { value: ScheduleFilter; label: string }[] = [
  { value: "All", label: "Tất cả" },
  { value: "Beginner1A", label: "Sơ cấp 1A" },
  { value: "Beginner1B", label: "Sơ cấp 1B" },
  { value: "Intermediate1A", label: "Trung cấp 1A" },
];

export const dayLabels: Record<ClassSession["day"], string> = {
  Mon: "Th 2",
  Tue: "Th 3",
  Wed: "Th 4",
  Thu: "Th 5",
  Fri: "Th 6",
  Sat: "Th 7",
  Sun: "CN",
};

export const formatLabels: Record<ClassSession["format"], string> = {
  "1:1": "1 kèm 1",
  Group: "Nhóm",
};

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const weekDays = days.map((day) => ({
  value: day,
  label: dayLabels[day],
  korean: {
    Mon: "월",
    Tue: "화",
    Wed: "수",
    Thu: "목",
    Fri: "금",
    Sat: "토",
    Sun: "일",
  }[day],
}));

type ClassSessionInput = Omit<ClassSession, "id">;

const createClassId = ({ title, day, start }: ClassSessionInput) =>
  `${day}-${start}-${title}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const classSessions: ClassSessionInput[] = [
  {
    title: "Tiếng Hàn sơ cấp 1A",
    korean: "한글 기초",
    day: "Tue",
    start: "21:00",
    end: "23:00",
    level: "Beginner1A",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Tiếng Hàn sơ cấp 1A",
    korean: "한글 기초",
    day: "Sat",
    start: "21:00",
    end: "23:00",
    level: "Beginner1A",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Tiếng Hàn sơ cấp 1A",
    korean: "한글 기초",
    day: "Sun",
    start: "21:00",
    end: "23:00",
    level: "Beginner1A",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Tiếng Hàn sơ cấp 1B",
    korean: "한국어 초급1B",
    day: "Wed",
    start: "21:00",
    end: "23:00",
    level: "Beginner1B",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Tiếng Hàn sơ cấp 1B",
    korean: "한국어 초급1B",
    day: "Thu",
    start: "21:00",
    end: "23:00",
    level: "Beginner1B",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Tiếng Hàn sơ cấp 1B",
    korean: "한국어 초급1B",
    day: "Fri",
    start: "21:00",
    end: "23:00",
    level: "Beginner1B",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Tiếng Hàn trung cấp 1A",
    korean: "한국어 중급1A",
    day: "Sat",
    start: "14:30",
    end: "16:30",
    level: "Intermediate1A",
    seatsLeft: 2,
    format: "Group",
  },
  {
    title: "Tiếng Hàn trung cấp 1A",
    korean: "한국어 중급1A",
    day: "Sun",
    start: "14:30",
    end: "16:30",
    level: "Intermediate1A",
    seatsLeft: 2,
    format: "Group",
  },
];

export const classes: ClassSession[] = classSessions.map((session) => ({
  ...session,
  id: createClassId(session),
}));

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  detail: string;
  images: string[];
};

export const certifications: Certification[] = [
  {
    title: "TOPIK Cấp 6",
    issuer: "NIIED - Viện giáo dục quốc tế quốc gia, Hàn Quốc",
    year: "2022",
    detail:
      "Đạt TOPIK Cấp 6 – cấp độ cao nhất của Kỳ thi Năng lực Tiếng Hàn (TOPIK), chứng minh khả năng sử dụng tiếng Hàn thành thạo trong môi trường học thuật và chuyên nghiệp, bao gồm giao tiếp, biên phiên dịch và xử lý tài liệu chuyên ngành.",
    images: ["/images/topik.PNG"],
  },
  {
    title: "Chứng nhận bổ nhiệm Phiên dịch viên IT tiếng Hàn",
    issuer: "Samsung SDS Việt Nam",
    year: "2022-2026",
    detail:
      "Chứng nhận bổ nhiệm chính thức vào vị trí Phiên dịch viên IT tiếng Hàn, chịu trách nhiệm phiên dịch và biên dịch tài liệu kỹ thuật, hỗ trợ giao tiếp giữa các nhóm phát triển Việt Nam và Hàn Quốc, đồng thời đảm bảo truyền đạt chính xác các yêu cầu nghiệp vụ và kỹ thuật trong quá trình triển khai dự án.",
    images: ["/images/samsung1.jpeg", "/images/samsung2.jpeg"],
  },
  {
    title: "Chứng nhận tốt nghiệp Chương trình Tiếng Hàn",
    issuer: "Trường Đại học Sogang (서강대학교)",
    year: "2022",
    detail:
      "Hoàn thành chương trình đào tạo tiếng Hàn chuyên sâu tại Trung tâm Ngôn ngữ Đại học Sogang với tư cách nghiên cứu sinh nhận học bổng toàn phần của quỹ Korean Foundation, phát triển toàn diện bốn kỹ năng nghe, nói, đọc, viết cùng khả năng giao tiếp học thuật và chuyên nghiệp trong môi trường quốc tế.",
    images: [
      "/images/report1.png",
      "/images/report2.png",
      "/images/report3.png",
      "/images/graduation.JPG",
      "/images/graduation2.JPG",
    ],
  },
  {
    title: "Chứng nhận Nghiệp vụ Sư phạm",
    issuer: "Trường Đại học Sư phạm Hà Nội 2",
    year: "2026",
    detail:
      "Hoàn thành chương trình đào tạo Nghiệp vụ Sư phạm, được trang bị kiến thức và kỹ năng về phương pháp giảng dạy hiện đại, thiết kế bài giảng, tổ chức lớp học trực tuyến tương tác và áp dụng phương pháp lấy người học làm trung tâm nhằm nâng cao hiệu quả đào tạo.",
    images: [],
  },
];

export type Skill = {
  name: string;
  korean: string;
  level: number; // 0-100
};

export const skills: Skill[] = [
  { name: "Ngữ pháp & Cú pháp", korean: "문법", level: 98 },
  { name: "Luyện hội thoại", korean: "회화", level: 95 },
  { name: "Luyện thi TOPIK", korean: "시험 대비", level: 92 },
  { name: "Phát âm", korean: "발음", level: 100 },
  { name: "Tiếng Hàn thương mại", korean: "비즈니스", level: 85 },
  { name: "Văn hóa & Ứng xử", korean: "문화", level: 94 },
];

export type Phrase = {
  hangeul: string;
  romanization: string;
  meaning: string;
};

export const phrases: Phrase[] = [
  {
    hangeul: "안녕하세요-",
    romanization: "annyeonghaseyo",
    meaning: "Xin chào",
  },
  { hangeul: "감사합니다", romanization: "gamsahamnida", meaning: "Cảm ơn" },
  {
    hangeul: "화이팅!",
    romanization: "hwaiting!",
    meaning: "Bạn làm được mà!",
  },
  {
    hangeul: "잘 부탁드려요",
    romanization: "jal butakdeuryeoyo",
    meaning: "Rất mong được đồng hành cùng bạn",
  },
  {
    hangeul: "오늘도 한 걸음",
    romanization: "oneuldo han georeum",
    meaning: "Hôm nay lại thêm một bước",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

type TestimonialInput = Omit<Testimonial, "id">;

const createTestimonialId = ({ name, role, quote }: TestimonialInput) =>
  `${name}-${role}-${quote.slice(0, 48)}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const testimonialInputs: TestimonialInput[] = [
  {
    quote:
      "Cô giáo dạy dễ hiểu, nhiệt tình. Giáo trình dễ tiếp thu.\nMong muốn: trong giờ luyện nghe em muốn nghe kĩ hơn. (Muốn cô Hằng đồng hành cùng chúng em trong quá trình học tập ở Việt Nam)",
    name: "Linh",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Cô giáo Hằng tận tâm, dạy dễ hiểu.\nMong muốn: hy vọng cô Hằng sẽ đồng hành cùng lớp hết khoá trong quá trình học. Bởi cô dạy hiệu quả, k muốn đổi giáo viên như trước dạy k hiệu quả k hiểu.",
    name: "Huệ",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Mong muốn: tiếp tục duy trì phương pháp học tập và giảng dạy của cô giáo. Mong cô giáo Hằng ở lại dạy chúng em hết khoá học, chúng em đang quen nhịp và phương pháp giảng dạy của cô giáo aaa.",
    name: "Ngọc",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Em thấy cô dễ thương, nhẹ nhàng, dạy học vui hihihi, dạy ổn với cá nhân e ạ.",
    name: "Ly",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Cô dạy dễ hiểu, kĩ càng, tốc độ dạy như bây giờ là ổn ạ. Cô hay luyện nói cho bọn em và sửa lỗi phát âm. Không cần thay đổi gì đâu aaa.",
    name: "Trang",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Trong quá trình học tập em nhận thấy được cô giảng dạy rất tận tâm, dễ hiểu luôn nhiệt tình tạo điều kiện hỗ trợ, quan tâm học sinh, phương pháp giảng dạy thực tế sát xao.",
    name: "Ánh",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Em muốn tiếp tục luyện phát âm nhiều hơn, thường xuyên đưa ra những ví dụ thực tế.\nMong muốn: muốn cô dạy chậm hơn một chút, đưa ra những đề xuất và phương pháp học hay.",
    name: "Phương",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Cô giáo ko quá nghiêm khắc cũng ko quá dễ dãi, vừa đủ để tạo động lực cảm hứng học tập cho học viên ạ.\nMong muốn: em muốn nhiều bài tập về nhà hơn ạ - tạm thời hiện tại em chưa muốn thử gì nhưng cho em hỏi là app từ điển Hàn - Việt hoặc từ điển Hàn - Anh nào dùng ok ạ.",
    name: "Hường",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Từ mới mở rộng hơn trong sách, có những vd dễ hiểu rõ hơn về cấu trúc câu. Cô giáo giảng dễ hiểu.\nMong muốn: cho nhiều bài tập hơn đi ạ, nếu được thì cho bọn e thêm bài nói nữa, muốn thử: thay phiên nhau đóng 1 cảnh kinh điển trong K drama 🤡.",
    name: "Ngân",
    role: "Sơ cấp → TOPIK 4",
  },
  {
    quote:
      "Học giáo trình bên cô, chị được luyện nói nhiều, đc lên ý tưởng lm hội thoại nên dễ nhớ và áp dụng được vào cuộc sống, cv dễ dàng hơn.",
    name: "Ly",
    role: "Trung cấp 3",
  },
];

export const testimonials: Testimonial[] = testimonialInputs.map(
  (testimonial) => ({
    ...testimonial,
    id: createTestimonialId(testimonial),
  }),
);
