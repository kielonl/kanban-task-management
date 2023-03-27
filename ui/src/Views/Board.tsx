import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Column } from "../components/Column/Column";
import { Loader } from "../components/Loader/Loader";
import { useColumnCollection } from "../hooks/useColumnCollection";

export const Board = () => {
  const { columns, loading } = useColumnCollection();

  if (!loading && !columns?.length) return <div>no columns added yet</div>;
  if (loading) return <Loader />;

  return (
    <div className="h-full overflow-x-scroll p-8 text-gray-600 flex flex-row gap-8 bg-light-grey">
      <DndProvider backend={HTML5Backend}>
        {columns?.map((column) => (
          <Column key={column.id} name={column.name} />
        ))}
      </DndProvider>
    </div>
  );
};
