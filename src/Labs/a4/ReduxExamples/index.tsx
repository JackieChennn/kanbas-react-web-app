import React from "react";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";

const ReduxExamples = () => {
  return (
      <div>
        <h2>Redux Examples</h2>
        <CounterRedux/>
        <HelloRedux/>
      </div>
  );
};

export default ReduxExamples;