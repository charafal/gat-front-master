import { Routes, Route } from "react-router";
import './test.js'
import Dashboard from "../../screens/dashboard/index.jsx";
function Content() {
  return (
    <Routes>
        <Route path="/dash" Component={Dashboard}></Route>
    </Routes>
  );
}

export default Content;
