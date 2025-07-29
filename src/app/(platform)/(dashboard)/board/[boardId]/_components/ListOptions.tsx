import { List } from "@/generated/prisma";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data }: ListOptionsProps) => {
  return <div>ListOptions</div>;
};

export default ListOptions;
