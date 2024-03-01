const express = require("express");
const axios = require("axios");
const router = express.Router();
const { getExplanation, getCode } = require("../util/parseResponse");

router.post("/hints", async (req, res) => {
  const prompt = `Based on the problem titled '${req.body.problem}' which involves ${req.body.description}, provide three to five hints to guide the user toward the solution. Each hint should progressively build on the last, starting with a general strategy, moving to exploring underlying concepts, and finally suggesting a more specific approach. Avoid giving away the solution directly. Structure your hints to encourage problem-solving and understanding of the concepts involved.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response.status === 429) {
      console.error("Rate limit exceeded");
      res.status(429).send("Rate limit exceeded. Please try again later.");
    } else {
      res.status(500).send("An error occurred");
    }
  }
});

router.post("/solution", async (req, res) => {
  const prompt = `Please provide a solution for the following problem in JavaScript. Ensure your response is concise and clear, using Javascript. The problem and its description are as follows: "${req.body.problem} ${req.body.description}". Provide literally only the code, nothing else and make sure the function is titled the same. Do not include the type of language.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response.status === 429) {
      console.error("Rate limit exceeded");
      res.status(429).send("Rate limit exceeded. Please try again later.");
    } else {
      res.status(500).send("An error occurred");
    }
  }
});

module.exports = router;
