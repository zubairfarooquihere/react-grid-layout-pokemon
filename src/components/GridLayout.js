import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useSelector, useDispatch } from "react-redux";

import { layoutActions } from "../redux/Layout-slice";

import Pokemon from "./Pokemon";
import GeneratePokemon from "./GeneratePokemon";

const ResponsiveGridLayout = WidthProvider(Responsive);
const GridLayout = () => {
  const dispatch = useDispatch();
  const [Breakpoint, setBreakpoint] = useState("lg");

  const layoutObj = useSelector((state) => state.layout);
  const layout = layoutObj.layout;
  const pokemonObj = useSelector((state) => state.pokemon);

  const onDragStopResizeStop = (layouts, Layout) => {
    dispatch(
      layoutActions.updateLayout({
        layouts: [...layouts],
        breakpoint: Breakpoint
      })
    );
  };

  const onBreakpointChange = (gotBreakpoint) => {
    setBreakpoint(gotBreakpoint);
  };

  return (
    <div>
      <GeneratePokemon
        pokemonList={pokemonObj.idList}
        Breakpoint={Breakpoint}
      />
      <ResponsiveGridLayout
        layouts={layout}
        breakpoints={layoutObj["breakpoints"]}
        cols={layoutObj["cols"]}
        rowHeight={layoutObj["rows"][Breakpoint]}
        width={1200}
        onDragStop={onDragStopResizeStop}
        onResizeStop={onDragStopResizeStop}
        onBreakpointChange={onBreakpointChange}
      >
        {pokemonObj.idList.map((id, index) => {
          return (
            <div
              data-grid={layout[Breakpoint][index]}
              //index will be same because when pokemon obj comes it will push it in pokemon reducer and imidiately will push it in layout reducer
              key={id}
            >
              <Pokemon pokemon={pokemonObj.data[id]} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridLayout;
