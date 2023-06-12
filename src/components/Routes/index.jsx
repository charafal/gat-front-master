import { Routes, Route } from "react-router";
import Dashboard from "../../screens/dashboard/index.jsx";
import Beneficiaire from "../../screens/Beneficiaires/index.jsx";
import Forfait from "../../screens/Forfait/index.jsx";
import AddBeneficiaire from "../../screens/Beneficiaires/AddBeneficiaire.jsx";
import ConsulterBeneficiaire from "../../screens/Beneficiaires/ConsulterBeneficiaire.jsx";
import ModifierBeneficiaire from "../../screens/Beneficiaires/ModifierBeneficiaire.jsx";

export default function Content() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} exact></Route>
        <Route path="/beneficiaires" element={<Beneficiaire />}></Route>
        <Route path="/forfaits" element={<Forfait />}></Route>
        <Route path="/addBeneficiaire" element={<AddBeneficiaire />}></Route>
        <Route path="/consulterBeneficiaire/:id" element={<ConsulterBeneficiaire />} />
        <Route path="/modifierBeneficiaire/:id" element={<ModifierBeneficiaire />} />
    </Routes>
  );
}
