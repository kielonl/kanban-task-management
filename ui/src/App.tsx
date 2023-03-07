import "./App.scss";
import { TaskProps } from "./types";
import { Task } from "./components/Task/Task";

const tasks: TaskProps[] = [
  {
    id: "1",
    title:
      "Research pricing points of various competitors and trial different business models",
    description:
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    status: "doing",
    subtasks: [
      {
        title: "Research competitor pricing and business models",
        isCompleted: true,
      },
      {
        title: "Outline a business model that works for our solution",
        isCompleted: true,
      },
      {
        title:
          "Talk to potential customers about our proposed solution and ask for fair price expectancy",
        isCompleted: false,
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      {tasks.map((task) => {
        return <Task {...task} key={task.id} />;
      })}
    </div>
  );
}

export default App;
