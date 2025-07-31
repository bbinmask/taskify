import ModalProvider from "@/components/providers/modal-provider";
import QueryProviders from "@/components/providers/query-providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProviders>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProviders>
    </ClerkProvider>
  );
};

export default PlatformLayout;
