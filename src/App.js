import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";

const data = [
  {
    id: "item-1",
    content: "Mango",
  },
  {
    id: "item-2",
    content: "Apple",
  },
  {
    id: "item-3",
    content: "Guava",
  },
  {
    id: "item-4",
    content: "Carot",
  },
  {
    id: "item-5",
    content: "Coconut",
  },
  {
    id: "item-6",
    content: "Cherry",
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.form(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "gray",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgray",
  padding: grid,
  width: 250,
});

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    console.log("reorderedItems", reorderedItems);
    setItems(reorderedItems);
  };

  return (
    <div className="App m-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
