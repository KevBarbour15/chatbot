const parseResponse = (response) => {
  console.log("Parsing response... " + response);
  return response;
};

const getCode = (response) => {
  const code = response.split("^")[1];
  return code;
};

const getExplanation = (response) => {
  const explanation = response.split("^")[0];
  return explanation;
};

module.exports = { parseResponse, getCode, getExplanation };
