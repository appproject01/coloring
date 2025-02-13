import SomeComponent from "./FloatingActionButton";

const projectModeMap = {
  drawing: {
    solution: {
      icon: "S",
      subtitle: "Step-by-Step mode",
      component: <SomeComponent />,
      heading2: "Inspire",
      heading3: "Drawing",
    },
    answer: {
      icon: "F",
      subtitle: "Full artwork mode",
      component: <SomeComponent />,
      heading2: "Inspire",
      heading3: "Artwork",
    },
  },
  sudoku: {
    solution: {
      icon: "Q",
      subtitle: "Step-by-Step solutions",
      component: <SomeComponent />,
      heading2: "Solutions",
      heading3: "Solution",
    },
    answer: {
      icon: "A",
      subtitle: "Answers",
      component: <SomeComponent />,
      heading2: "Answers",
      heading3: "Answer",
    },
  },
  searchpuzzle: {
    word: {
      icon: "W",
      subtitle: "Word Search Step-by-Step Solutions",
      component: <SomeComponent />,
      heading2: "Word Search",
      heading3: "Solution",
    },
    number: {
      icon: "N",
      subtitle: "Number Search Step-by-Step Solutions",
      component: <SomeComponent />,
      heading2: "Number Search",
      heading3: "Solution",
    },
  },
};

const heading1Map = {
  drawing: "Color guide",
  sudoku: "Sudoku puzzles",
  searchpuzzle: "Word Search Puzzles",
};

export { projectModeMap, heading1Map };
