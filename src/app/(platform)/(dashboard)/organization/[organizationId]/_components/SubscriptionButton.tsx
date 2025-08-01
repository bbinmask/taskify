"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onClick = () => {
    if (isPro) execute({});
    else {
      proModal.onOpen();
    }
  };

  return (
    <div>
      <Button onClick={onClick} disabled={isLoading} variant={"primary"}>
        {isPro ? "Manage subscription" : "Upgrade to pro"}
      </Button>
    </div>
  );
};

export default SubscriptionButton;
