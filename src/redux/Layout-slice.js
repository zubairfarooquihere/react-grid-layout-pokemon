import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState: {
    breakpoints: {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
    },
    cols: {
      //cols to place pokemon
      lg: 50,
      md: 40,
      sm: 30,
      xs: 20,
      xxs: 20,
    },
    rows: {
      //Height of grid
      lg: 100,
      md: 95,
      sm: 90,
      xs: 85,
      xxs: 65,
    },
    layout: {
      lg: [],
      md: [],
      sm: [],
      xs: [],
      xxs: [],
    },
    Touched: {
      lg: false,
      md: false,
      sm: false,
      xs: false,
      xxs: false,
    },
    max: {
      maxX: 0,
      maxY: 100,
    }
  },
  reducers: {
    addLayout(state, action) {
      const breakpoints = Object.keys(state.layout);
      breakpoints.forEach((loopBreakpoint) => {
        state.layout[loopBreakpoint].push({
          i: action.payload.id,
          x: state.max.maxX,
          y: state.max.maxY,
          w: 10,
          h: 2,
          minW: 1,
          minH: 1,
          maxH: Infinity,
          maxW: Infinity,
        });
      });
    },
    updateLayout(state, action) {
      const { layouts, breakpoint } = action.payload;
      state.Touched[breakpoint] = true;
      var flag = false
      const breakpoints = Object.keys(state.layout);
      breakpoints.forEach((loopBreakpoint) => {
        if(loopBreakpoint === breakpoint || flag === true) {
          flag = true;
          if(loopBreakpoint === breakpoint || state.Touched[loopBreakpoint] === false) {
            state.layout[loopBreakpoint] = [...layouts];
          }
        }
      });
    },
  },
});

export const layoutActions = layoutSlice.actions;

export default layoutSlice;
