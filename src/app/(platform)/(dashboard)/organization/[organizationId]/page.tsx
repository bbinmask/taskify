import { Separator } from "@/components/ui/separator";
import Info from "./_components/Info";
import BoardList from "./_components/BoardList";

const OrganizationIdPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator />

      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationIdPage;
