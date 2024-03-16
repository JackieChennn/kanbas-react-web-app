import React from "react";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";

const ReduxExamples = () => {
  return (
      <div>
        <h2>Redux Examples</h2>
        <AddRedux/>
        <CounterRedux/>
        <HelloRedux/>
      </div>
  );
};

export default ReduxExamples;