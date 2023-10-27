import React, { useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import "./App.css";
import { Responsive, WidthProvider } from "react-grid-layout";

import classes from "./App.module.scss";
const layoutArrayTouch = [false, false, false, false]; // if true then don't take changes from above level (sm will be independent if true)

const App = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const pokemonData = {
    1: {
      id: "1",
      name: "Bulbasaur",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    4: {
      id: "4",
      name: "Charmander",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    7: {
      id: "7",
      name: "Squirtle",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
  };
  const pokemonId = ["1", "4", "7"];

  const [activeBreakpoint, setactiveBreakpoint] = useState("lg");

  const [layout, setLayout] = useState({
    lg: [],
    sm: [],
    xs: [],
    xxs: [],
  });

  let currentLayout = [];
  const layoutArray = ["lg", "sm", "xs", "xxs"];

  const DragStop = (layouts) => {
    currentLayout = [...layouts];
    const index = layoutArray.findIndex((bp) => activeBreakpoint === bp);
    if (index !== -1) {
      layoutArrayTouch[index] = true;
    }
  };

  const resizeChange = (layouts) => {
    currentLayout = [...layouts];
    const index = layoutArray.findIndex((bp) => activeBreakpoint === bp);
    if (index !== -1) {
      layoutArrayTouch[index] = true;
    }
  };

  const handleBreakpointChange = (Breakpoint, layot) => {
    console.log(Breakpoint);
    if (activeBreakpoint !== Breakpoint) {
      if (
        layout[activeBreakpoint] !== currentLayout &&
        currentLayout.length > 0
      ) {
        const index = layoutArray.findIndex((bp) => activeBreakpoint === bp);

        if (index !== -1) {
          const layoutUpdates = {};
          for (let i = index; i < layoutArray.length; i++) {  //Copy
            //Taking changes to itself and copying in children only if children's touched is false, if true it means it will have idependent changes.
            if (
              activeBreakpoint === layoutArray[i] ||
              layoutArrayTouch[i] === false 
            ) {
              layoutUpdates[layoutArray[i]] = currentLayout;
            } else {
              //It will have independent changes and its children will depend on its changes.
              break;
            }
          }

          setLayout((prevState) => ({
            ...prevState,
            ...layoutUpdates,
          }));
        }
      }
      currentLayout = [];
      setactiveBreakpoint(Breakpoint);
    }
  };

  return (
    <div className={classes.Root}>
      <ResponsiveGridLayout
        layouts={layout}
        breakpoints={{ lg: 1200, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, sm: 4, xs: 2, xxs: 1 }}
        className={classes.GridLayout}
        rowHeight={150}
        onBreakpointChange={handleBreakpointChange}
        onDragStop={DragStop}
        onResizeStop={resizeChange}
      >
        {pokemonId.map((id, index) => {
          return (
            <div
              className={classes.GridItemWrapper}
              key={pokemonData[id].id}
              data-grid={{
                //x point horizontal
                x: layout[activeBreakpoint][index]
                  ? layout[activeBreakpoint][index].x
                  : index,
                //y point vertical
                y: layout[activeBreakpoint][index]
                  ? layout[activeBreakpoint][index].y
                  : 0,
                //w width
                w: layout[activeBreakpoint][index]
                  ? layout[activeBreakpoint][index].w
                  : 1,
                //h height
                h: layout[activeBreakpoint][index]
                  ? layout[activeBreakpoint][index].h
                  : 2,
                //i id
                i: layout[activeBreakpoint][index]
                  ? layout[activeBreakpoint][index].i
                  : id,
                minW: 1,
                maxW: Infinity,
                minH: 1,
                maxH: Infinity,
              }}
            >
              <div className={classes.GridItemContent}>
                {pokemonData[id].name}
              </div>
              <img alt="pokemon" src={pokemonData[id].img} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default App;
