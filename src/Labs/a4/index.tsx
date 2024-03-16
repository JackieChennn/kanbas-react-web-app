import React from "react";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";

const Assignment4 = () => {
  function sayHello() {
    alert("Hello");
  }
  return (
      <>
        <h1>Assignment 4</h1>
        <PassingFunctions theFunction={sayHello}/>
        <PassingDataOnEvent/>
        <ClickEvent/>
      </>
  );
};
export default Assignment4;