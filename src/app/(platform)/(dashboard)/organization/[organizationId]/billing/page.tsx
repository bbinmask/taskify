import { checkSubscription } from "@/lib/subscription";
import Info from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "../_components/SubscriptionButton";

const BillingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default BillingPage;
