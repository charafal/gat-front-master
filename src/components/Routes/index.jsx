import { Routes, Route } from "react-router";
import Dashboard from "../../screens/dashboard/index.jsx";
import Beneficiaire from "../../screens/Beneficiaires/index.jsx";
import Forfait from "../../screens/Forfait/index.jsx";
import AddBeneficiaire from "../../screens/Beneficiaires/AddBeneficiaire.jsx";

export default function Content() {
  return (
    <Routes>
        <Route path="/" Component={Dashboard} exact></Route>
        <Route path="/beneficiaires" Component={Beneficiaire}></Route>
        <Route path="/forfaits" Component={Forfait}></Route>
        <Route path="/AddBeneficiaire" Component={AddBeneficiaire}></Route>
    </Routes>
  );
}

