import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | AX総研",
    default: "AX総研 | AIトランスフォーメーション情報ポータル",
  },
  metadataBase: new URL("http://localhost:3001"),
  description: "AIトランスフォーメーションに関する最新情報と専門知識を提供する情報ポータルサイト",
  keywords: ["AI", "トランスフォーメーション", "人工知能", "DX", "ビジネス活用", "最新技術"],
  authors: [{ name: "AX総研" }],
  creator: "AX総研",
  publisher: "AX総研",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "AX総研 | AIトランスフォーメーション情報ポータル",
    description: "AIトランスフォーメーションに関する最新情報と専門知識を提供する情報ポータルサイト",
    siteName: "AX総研",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AX総研",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AX総研 | AIトランスフォーメーション情報ポータル",
    description: "AIトランスフォーメーションに関する最新情報と専門知識を提供する情報ポータルサイト",
    images: ["/images/og-image.jpg"],
  },
};
