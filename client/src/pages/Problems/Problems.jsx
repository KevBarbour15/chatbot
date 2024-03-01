import { useState } from "react";
import { Link } from "react-router-dom";
import codingProblemsData from "../../problems.json";
import "./problems.css";

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = codingProblemsData.coding_problems.filter(
    (problem) => {
      return (
        problem.problem_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        problem.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  );

  return (
    <div className="problems-container">
      <input
        type="text"
        placeholder="Search by problem name or category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="problems">
        {filteredProblems.map((problem, index) => (
          <Link
            to={`/problems/${index}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div key={index} className="problem-card">
              <h3>{problem.problem_name}</h3>
              <p>Category: {problem.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Problems;
