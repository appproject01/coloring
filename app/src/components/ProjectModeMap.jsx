import SomeComponent from "./FloatingActionButton";
import {
  Filter9Plus,
  TextRotationNone,
  QuestionAnswer,
  SettingsSuggest,
} from "@mui/icons-material";

const projectModeMap = {
  drawing: {
    solution: {
      icon: "S",
      subtitle: "Step-by-Step mode",
      component: <SomeComponent />,
      heading2: "Inspire",
      heading3: "Drawing",
      listName: "Drawing",
      placeholder: "Type a drawing ID (example: D-1)...",
      muiicon: SettingsSuggest,
    },
    answer: {
      icon: "F",
      subtitle: "Full artwork mode",
      component: <SomeComponent />,
      heading2: "Inspire",
      heading3: "Artwork",
      listName: "Artwork",
      placeholder: "Type a drawing ID (example: D-1)...",
      muiicon: QuestionAnswer,
    },
  },
  sudoku: {
    solution: {
      icon: "Q",
      subtitle: "Step-by-Step solutions",
      component: <SomeComponent />,
      heading2: "Solutions",
      heading3: "Solution",
      listName: "Puzzle",
      placeholder: "Type a puzzle ID (example: L-1-1)...",
      muiicon: SettingsSuggest,
    },
    answer: {
      icon: "A",
      subtitle: "Answers",
      component: <SomeComponent />,
      heading2: "Answers",
      heading3: "Answer",
      listName: "Puzzle",
      placeholder: "Type a puzzle ID (example: L-1-1)...",
      muiicon: QuestionAnswer,
    },
  },
  searchpuzzle: {
    word: {
      icon: "W",
      subtitle: "Word Search Step-by-Step Solutions",
      component: <SomeComponent />,
      heading2: "Word Search",
      heading3: "Solution",
      listName: "Puzzle",
      placeholder: "Type a puzzle ID (example: W-1-1)...",
      muiicon: TextRotationNone,
    },
    number: {
      icon: "N",
      subtitle: "Number Search Step-by-Step Solutions",
      component: <SomeComponent />,
      heading2: "Number Search",
      heading3: "Solution",
      listName: "Puzzle",
      placeholder: "Type a puzzle ID (example: N-1-1)...",
      muiicon: Filter9Plus,
    },
  },
};

const heading1Map = {
  drawing: "Color guide",
  sudoku: "Sudoku puzzles",
  searchpuzzle: "Word Search Puzzles",
};

export { projectModeMap, heading1Map };
