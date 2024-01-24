import React from "react";

const Question = ({ question, answer, dispatch }) => {
  //console.log(question);
  const hasAnswered = answer !== null;

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, btnind) => (
          <button
            className={`btn btn-option ${btnind === answer ? "answer" : ""} ${
              hasAnswered &&
              (btnind === question.correctOption ? "correct" : "wrong")
            }  }`}
            key={option}
            disabled={hasAnswered === true}
            onClick={() => dispatch({ type: "isAnswered", ind: btnind })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
