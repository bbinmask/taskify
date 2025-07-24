import { db } from "@/lib/db";

const OrganizationIdPage = ({ params }: { params: { id: string } }) => {
  async function create(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;

    await db.board.create({
      data: {
        title,
      },
    });
  }

  return (
    <div>
      <form action={create}>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Title"
          className="border-black border p-1"
        />
      </form>
    </div>
  );
};

export default OrganizationIdPage;
