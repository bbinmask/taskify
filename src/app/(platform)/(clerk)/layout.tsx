import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* <ClerkProvider> */}
      {children}
      {/* </ClerkProvider> */}
    </div>
  );
}
