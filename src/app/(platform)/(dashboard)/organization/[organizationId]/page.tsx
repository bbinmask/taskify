import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

import Form from "./Form";
import Board from "./Board";

const OrganizationIdPage = async ({ params }: { params: { id: string } }) => {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y-2">
        {boards.map((board) => (
          <Board title={board.title} id={board.id} key={board.id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
