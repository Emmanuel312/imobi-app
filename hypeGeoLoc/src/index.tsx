import React from "react";
import Main from "./pages/Main";
import { StatusBar } from "react-native";

const Source: React.FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <Main />
    </>
  );
};

export default Source;
