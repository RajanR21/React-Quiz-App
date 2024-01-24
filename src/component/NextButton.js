import React from "react";

const NextButton = ({ dispatch, answer, questions, index }) => {
  if (answer === null) return null;

  function handleNext() {
    dispatch({ type: "nextQuestion" });
    dispatch({ type: "afterNext" });
  }

  function handleFinish() {
    dispatch({ type: "finish" });
  }

  if (questions.length - 1 > index)
    return (
      <button className="btn btn-ui" onClick={() => handleNext()}>
        Next
      </button>
    );

  if (questions.length - 1 === index)
    return (
      <button className="btn btn-ui" onClick={() => handleFinish()}>
        Finish
      </button>
    );
};

export default NextButton;
