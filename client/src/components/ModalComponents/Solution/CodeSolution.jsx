import "./code-solution.css";
import {useEffect} from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const CodeSolution = ({ code }) => {

  useEffect(() => {
    Prism.highlightAll();
  }, []);
  console.log(code);
  return (
    <div className="display-solution">
      <pre>
        <code className="language-javascript">{code}</code>
      </pre>
    </div>
  );
};

export default CodeSolution;
