import { useState, useEffect, useCallback} from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import "./coding-problem.css";

const CodingProblem = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const { problem_name } = useParams(); 

  const handleAskQuestion = useCallback(async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/api/chat", {
        prompt: question,
      });

      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Failed to fetch the response:", error);
      setResponse("Sorry, something went wrong.");
    }
  }, [question]); 

  useEffect(() => {
    setQuestion(
      "Explain the coding problem: " +
        problem_name +
        " and do not provide a solution. Give a detailed description of the problem, as if you were an interviewer. And provide an example if necessary."
    );
  }, [problem_name]);

  useEffect(() => {
    if (question) {
      handleAskQuestion();
    }
  }, [question, handleAskQuestion]);

  return (
    <div className="problem-container">
      <h1>{problem_name}</h1>
      <div className="response-container">
        {response && (
          <div>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingProblem;
