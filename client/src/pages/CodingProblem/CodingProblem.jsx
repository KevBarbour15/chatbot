import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Hints from "../../components/ModalComponents/Hints/Hints";
import CodeSolution from "../../components/ModalComponents/Solution/CodeSolution";
import codingProblemsData from "../../problems.json";
import "./coding-problem.css";

const CodingProblem = () => {
  // work on loading state, caching and error handling
  const [problem, setProblem] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [response, setResponse] = useState("");
  const [hints, setHints] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [codeSolution, setCodeSolution] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const { index } = useParams();

  useEffect(() => {
    setProblem(codingProblemsData.coding_problems[index].problem_name);
    setDescription(codingProblemsData.coding_problems[index].description);
    setDifficulty(codingProblemsData.coding_problems[index].difficulty);
    setCategory(codingProblemsData.coding_problems[index].category);
  }, [index]);

  useEffect(() => {
    const fetchHints = async () => {
      try {
        const { data } = await axios.post("http://localhost:3001/api/hints", {
          problem: problem,
          description: description,
        });

        setHints(data.choices[0].message.content);
        setResponse(data.choices[0].message.content);
      } catch (error) {
        console.error("Failed to fetch the response:", error);
        setResponse("Sorry, something went wrong.");
      }
    };

    const fetchSolution = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/solution",
          {
            problem: problem,
            description: description,
          }
        );

        setCodeSolution(data.choices[0].message.content);
      } catch (error) {
        console.error("Failed to fetch the response:", error);
        setResponse("Sorry, something went wrong.");
      }
    };

    fetchHints();
    fetchSolution();
  }, [problem, description]);

  const openModalWithContent = (contentType) => {
    setIsModalOpen(true);

    if (contentType === "hints" && hints) {
      setModalTitle("Hints");
      setModalContent(<Hints hints={hints} />);
    } else if (contentType === "solution" && codeSolution) {
      setModalTitle("Solution Code");
      setModalContent(<CodeSolution code={codeSolution} />);
    }
  };

  return (
    <>
      <div className="problem-container">
        <h1>{problem}</h1>
        <p>Difficulty: {difficulty}</p>
        <p>Category: {category}</p>
        <div className="description-container">
          <p>{description}</p>
        </div>
        <div className="buttons-container">
          <button onClick={() => openModalWithContent("hints")}>Hints</button>
          <button onClick={() => openModalWithContent("solution")}>
            Solution Code
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={() => setIsModalOpen(false)}
      >
        <div>{modalContent}</div>
      </Modal>
    </>
  );
};

export default CodingProblem;
