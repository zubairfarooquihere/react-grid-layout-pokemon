import React from "react";
//import { useSelector } from "react-redux";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
//import classes from './App.module.scss';

import GridLayout from "./components/GridLayout";

const App = () => {

  return (
    <div>
      <GridLayout />
    </div>
  );
};

export default App;
