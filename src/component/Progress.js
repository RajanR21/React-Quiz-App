import React from "react";

const Progress = ({ questions, index, totalPoints, maxpoints }) => {
  console.log(totalPoints);
  return (
    <header className="progress">
      <progress max={questions.length} value={index} />

      <p>
        Questions <strong>{index + 1}</strong> / {questions.length}
      </p>

      <p>
        <strong>{totalPoints}</strong> / {280}
      </p>
    </header>
  );
};

export default Progress;
