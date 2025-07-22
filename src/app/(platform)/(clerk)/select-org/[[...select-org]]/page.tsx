import { OrganizationList } from "@clerk/nextjs";

const CreateOrganizationPageS = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
};

export default CreateOrganizationPageS;
