import SomeComponent from './FloatingActionButton';

const projectModeMap = {
    drawing: {
        solution: {
            icon: "S",
            subtitle: "Step-by-Step mode",
            component: <SomeComponent />
        },
        answer: {
            icon: "F",
            subtitle: "Full artwork mode",
            component: <SomeComponent />
        }
    },
    sudoku: {
        solution: {
            icon: "Q",
            subtitle: "Step-by-Step solutions",
            component: <SomeComponent />
        },
        answer: {
            icon: "A",
            subtitle: "Answers",
            component: <SomeComponent />
        }
    },
    searchpuzzle: {
        icon: "👁️",
        subtitle: "Search Puzzle Mode",
        component: <SomeComponent />
    }
};

export { projectModeMap };
