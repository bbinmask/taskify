import React from "react";

const IdPage = ({ params }: { params: { id: string } }) => {
  return <div>id is {params.id}</div>;
};

export default IdPage;
