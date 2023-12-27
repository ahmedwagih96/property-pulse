import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
type Props = {
  files: FileList;
  removeFile: (fileToRemove: File) => void;
  handleOnDragEnd: (result: DropResult) => void;
};

function SelectedImages({ files, removeFile, handleOnDragEnd }: Props) {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="images">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {Array.from(files).map((file, index) => (
              <Draggable key={file.name} draggableId={file.name} index={index}>
                {(provided) => (
                  <div
                    className="flex justify-between p-3 border items-center"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="listing image"
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                      onClick={() => removeFile(file)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SelectedImages;
