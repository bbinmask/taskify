import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Taskify",
  description: "Taskify is a simple user-friendly task manager",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-full bg-slate-100`}>
        <main className="pt-4 pb-20 bg-slate-100">{children}</main>
      </body>
    </html>
  );
}
