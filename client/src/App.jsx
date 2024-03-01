import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CodingProblems from "./pages/Problems/Problems";
import CodingProblem from "./pages/CodingProblem/CodingProblem";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CodingProblems />} />
        <Route path="/problems/:index" element={<CodingProblem />} />
      </Routes>
    </Router>
  );
}

export default App;
