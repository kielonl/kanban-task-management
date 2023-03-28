import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Column } from "../components/Column/Column";
import { Loader } from "../components/Loader/Loader";
import { useColumnCollection } from "../hooks/useColumnCollection";
import { Button } from "../components/Button/Button";

export const Board = () => {
  const { columns, loading } = useColumnCollection();

  if (!loading && !columns?.length)
    return (
      <div className="h-full flex items-center justify-center flex-col text-gray-600 bg-light-grey dark:bg-very-dark-grey">
        no columns added yet
        <Button className="w-40">+ Add Column</Button>
      </div>
    );
  if (loading) return <Loader />;

  return (
    <div className="h-full overflow-x-scroll p-8 text-gray-600 flex flex-row gap-8 bg-light-grey dark:bg-very-dark-grey">
      <DndProvider backend={HTML5Backend}>
        {columns?.map((column) => (
          <Column key={column.id} name={column.name} />
        ))}
      </DndProvider>
    </div>
  );
};
