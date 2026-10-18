import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workspace Login",
  description: "Next.js authentication with NextAuth, Prisma and GitHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
