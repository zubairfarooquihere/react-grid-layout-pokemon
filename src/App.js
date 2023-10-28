import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import classes from "./App.module.scss";

const App = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  
  const [newBreakpoint, setNewBreakpoint] = useState('lg');
  const [layout, setLayout] = useState({
    lg: [
      { i: "blue-eyes-dragon", x: 0, y: 0, w: 1, h: 1 },
      { i: "dark-magician", x: 1, y: 0, w: 1, h: 1 },
      { i: "kuriboh", x: 4, y: 0, w: 1, h: 1 },
    ],
    md: [
      { i: "blue-eyes-dragon", x: 0, y: 0, w: 1, h: 1 },
      { i: "dark-magician", x: 1, y: 0, w: 1, h: 1 },
      { i: "kuriboh", x: 0, y: 0, w: 1, h: 1 },
    ],
    sm: [],
    xs: [],
    xxs: [],
  });

  const handleLayoutChange = (layoutz, layouts) => {

  };

  const DragStop = (layouts) => {
    console.log("DragStop");
    console.log(layouts);
    setLayout((prevState) => {
      return {
        ...prevState,
        [newBreakpoint]: [...layouts]
      }
    });
  };

  const handleBreakpointChange = (Breakpoint, layout) => {
    setNewBreakpoint(Breakpoint);
  };

  return (
    <div className={classes.Root}>
      <ResponsiveGridLayout
        layouts={layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={1000}
        className={classes.GridLayout}
        onLayoutChange={handleLayoutChange}
        onBreakpointChange={handleBreakpointChange}
        onDragStop={DragStop}
      >
        <div className={classes.GridItemWrapper} key="blue-eyes-dragon">
          <div className={classes.GridItemContent}>Blue Eyes Dragon</div>
        </div>
        <div className={classes.GridItemWrapper} key="dark-magician">
          <div className={classes.GridItemContent}>Dark Magician</div>
        </div>
        <div className={classes.GridItemWrapper} key="kuriboh">
          <div className={classes.GridItemContent}>Kuriboh</div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default App;