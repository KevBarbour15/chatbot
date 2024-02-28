import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CodingProblems from "./pages/CodingProblems/CodingProblems";
import CodingProblem from "./components/CodingProblem";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CodingProblems />} />
        <Route path="/problems/:problem_name" element={<CodingProblem />} />
      </Routes>
    </Router>
  );
}

export default App;
