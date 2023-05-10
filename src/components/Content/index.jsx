import { Routes, Route } from "react-router";
import Dashboard from "../../screens/dashboard/index.jsx";
import Beneficiaire from "../../screens/Beneficiaires/index.jsx";

export default function Content() {
  return (
    <Routes>
        <Route path="/" Component={Dashboard} exact></Route>
        <Route path="/beneficiaires" Component={Beneficiaire}></Route>
    </Routes>
  );
}
