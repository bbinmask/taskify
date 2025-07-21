import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <div className="w-full h-screen flex items-center justify-center">
        {children}
      </div>
    </ClerkProvider>
  );
}
