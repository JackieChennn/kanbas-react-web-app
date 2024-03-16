import React from "react";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";

const Assignment4 = () => {
  function sayHello() {
    alert("Hello");
  }

  return (
      <>
        <h1>Assignment 4</h1>
        <StringStateVariables/>
        <BooleanStateVariables/>
        <Counter/>
        <EventObject/>
        <PassingFunctions theFunction={sayHello}/>
        <PassingDataOnEvent/>
        <ClickEvent/>
      </>
  );
};
export default Assignment4;