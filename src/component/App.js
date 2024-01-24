import React, { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";

const App = () => {
  let intitialState = {
    questions: [],
    status: "Loading",
    index: 0,
    answer: null,
    totalPoints: 0,
  };

  let [{ questions, status, index, answer, totalPoints }, dispatch] =
    useReducer(reducer, intitialState);

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "Start":
        return {
          ...state,
          status: "active",
        };

      case "dataFailed":
        return {
          ...state,
          status: "Error",
        };

      case "isAnswered":
        let { totalPoints, questions, index } = state;
        let corrInd = questions[index].correctOption;
        if (action.ind === corrInd) {
          totalPoints += questions[index].points;
        }
        return {
          ...state,
          answer: action.ind,
          totalPoints: totalPoints,
        };

      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
        };

      case "afterNext":
        return {
          ...state,
          answer: (state.answer = null),
        };

      case "finish":
        return {
          ...state,
          status: "ready",
        };

      default:
        throw new Error("Action unknown");
    }
  }

  useEffect(function () {
    try {
      async function fetchData() {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        console.log(data);
        if (!res.ok) throw new Error("Some thing went wrong");
        dispatch({ type: "dataReceived", payload: data });

        console.log(data.length);
      }

      fetchData();
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }, []);

  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questions={questions}
              index={index}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              questions={questions}
            />
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
