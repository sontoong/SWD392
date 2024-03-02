import { useSetHeaderTitle } from "../hooks/useSetHeaderTitle";
// import EnterpriseModalEditGeneralInfo from "../components/ui-enterprise/EnterpriseModalEditGeneralInfo";
import EnterpriseDetailPage from "./EnterpriseDetailPage";

export default function TestPage() {
  useSetHeaderTitle([
    {
      title: `test1`,
      path: "/login",
    },
  ]);

  return (
    // <EnterpriseModalEditGeneralInfo/>
    <EnterpriseDetailPage/>
  );
}
