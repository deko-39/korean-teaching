export type Level =
  | "Beginner"
  | "Beginner1B"
  | "Beginner2"
  | "Intermediate"
  | "Intermediate2"
  | "Advanced"
  | "Advanced2"
  | "TOPIK";

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
  Beginner: "bg-jade/15 text-jade border-jade/30",
  Beginner1B: "bg-jade/20 text-jade border-jade/35",
  Beginner2: "bg-jade/25 text-jade border-jade/40",
  Intermediate: "bg-gold/20 text-gold border-gold/40",
  Intermediate2: "bg-gold/30 text-gold border-gold/50",
  Advanced: "bg-accent/15 text-accent border-accent/30",
  Advanced2: "bg-accent/25 text-accent border-accent/40",
  TOPIK: "bg-primary/15 text-primary border-primary/30",
};

export const levelLabels: Record<Level, string> = {
  Beginner: "Sơ cấp 1A",
  Beginner1B: "Sơ cấp 1B",
  Beginner2: "Sơ cấp 2",
  Intermediate: "Trung cấp 1A",
  Intermediate2: "Trung cấp 2",
  Advanced: "Cao cấp",
  Advanced2: "Cao cấp 2",
  TOPIK: "TOPIK",
};

export const scheduleFilters: { value: ScheduleFilter; label: string }[] = [
  { value: "All", label: "Tất cả" },
  { value: "Beginner", label: "Sơ cấp 1A" },
  { value: "Beginner1B", label: "Sơ cấp 1B" },
  { value: "Beginner2", label: "Sơ cấp 2" },
  { value: "Intermediate", label: "Trung cấp 1A" },
  { value: "Intermediate2", label: "Trung cấp 2" },
  { value: "Advanced", label: "Cao cấp" },
  { value: "Advanced2", label: "Cao cấp 2" },
  { value: "TOPIK", label: "TOPIK" },
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
    title: "Khởi đầu với Hangeul",
    korean: "한글 기초",
    day: "Tue",
    start: "21:00",
    end: "23:00",
    level: "Beginner",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Khởi đầu với Hangeul",
    korean: "한글 기초",
    day: "Sat",
    start: "21:00",
    end: "23:00",
    level: "Beginner",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Khởi đầu với Hangeul",
    korean: "한글 기초",
    day: "Sun",
    start: "21:00",
    end: "23:00",
    level: "Beginner",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Khởi đầu với Hangeul",
    korean: "한글 기초",
    day: "Wed",
    start: "21:00",
    end: "23:00",
    level: "Beginner1B",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Khởi đầu với Hangeul",
    korean: "한글 기초",
    day: "Thu",
    start: "21:00",
    end: "23:00",
    level: "Beginner1B",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Khởi đầu với Hangeul",
    korean: "한글 기초",
    day: "Fri",
    start: "21:00",
    end: "23:00",
    level: "Beginner1B",
    seatsLeft: 3,
    format: "Group",
  },
  {
    title: "Tiếng Hàn trung cấp 1",
    korean: "일상 회화",
    day: "Sat",
    start: "14:30",
    end: "16:30",
    level: "Intermediate",
    seatsLeft: 2,
    format: "Group",
  },
  {
    title: "Tiếng Hàn trung cấp 1",
    korean: "일상 회화",
    day: "Sun",
    start: "14:30",
    end: "16:30",
    level: "Intermediate",
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
    issuer: "Korean Foundation (KF), Hàn Quốc",
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
      "/images/report_card.JPG",
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
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
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
    name: "Phương",
    role: "Sơ cấp 1A",
  },
  {
    quote:
      "Từ mới mở rộng hơn trong sách, có những vd dễ hiểu rõ hơn về cấu trúc câu. Cô giáo giảng dễ hiểu.\nMong muốn: cho nhiều bài tập hơn đi ạ, nếu được thì cho bọn e thêm bài nói nữa, muốn thử: thay phiên nhau đóng 1 cảnh kinh điển trong K drama 🤡.",
    name: "Ngân",
    role: "Sơ cấp 1A",
  },
  {
    quote:
      "Học giáo trình bên cô, chị được luyện nói nhiều, đc lên ý tưởng lm hội thoại nên dễ nhớ và áp dụng được vào cuộc sống, cv dễ dàng hơn.",
    name: "Ly",
    role: "Trung cấp 3",
  },
];
