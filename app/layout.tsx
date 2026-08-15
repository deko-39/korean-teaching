import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "함께 한국어 | Học tiếng Hàn cùng cô Khằng",
    template: "%s | 함께 한국어",
  },
  applicationName: "함께 한국어",
  description:
    "Giáo viên tiếng Hàn được chứng nhận với lộ trình học online và luyện thi TOPIK từ sơ cấp đến cao cấp. Xem chứng chỉ, lịch học theo giờ Việt Nam và đặt buổi học thử miễn phí.",
  keywords: [
    "học tiếng Hàn",
    "giáo viên tiếng Hàn",
    "luyện thi TOPIK",
    "lớp tiếng Hàn online",
    "tiếng Hàn cho người mới bắt đầu",
    "học tiếng Hàn 1 kèm 1",
    "cô Khằng",
  ],
  authors: [{ name: "Khằng" }],
  creator: "Khằng",
  publisher: "함께 한국어",
  category: "education",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "함께 한국어",
    title: "함께 한국어 | Học tiếng Hàn cùng cô Khằng",
    description:
      "Khám phá lớp học tiếng Hàn online, luyện thi TOPIK và lộ trình cá nhân hóa cùng cô Khằng.",
    images: [
      {
        url: "/images/teacher-profile.png",
        width: 1200,
        height: 630,
        alt: "Cô Khằng, giáo viên tiếng Hàn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "함께 한국어 | Học tiếng Hàn cùng cô Khằng",
    description:
      "Lớp học tiếng Hàn online, luyện thi TOPIK và buổi học thử miễn phí cùng cô Khằng.",
    images: ["/images/teacher-profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2ede1" },
    { media: "(prefers-color-scheme: dark)", color: "#181d2b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${notoSans.variable} ${notoSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
