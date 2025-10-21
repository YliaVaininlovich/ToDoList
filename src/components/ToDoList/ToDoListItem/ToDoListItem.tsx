import { useState } from "react";
import "./ToDoListItem.scss";
import { ToDo } from "../../../models/todo-item";

interface ToDoListItemProps {
  ToDoItem: ToDo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onDragStart?: (id: number) => void;
  onDragEnd?: (id: number) => void;
}

export const ToDoListItem = (props: ToDoListItemProps) => {
  const { ToDoItem, onDelete, onToggle, onDragStart, onDragEnd } = props;
  const { id, text, isDone } = ToDoItem;
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", id.toString());
    e.dataTransfer.effectAllowed = "move";
    onDragStart?.(id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <li 
      className={`todo-list-item__wrapper ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span>{text}</span>
      <div className="todo-list-item__buttons">
        <button 
          className="btn-trash" 
          onClick={handleDelete}
          title="Удалить задачу"
        >
        </button>
        <button 
          className={isDone ? "btn-check" : "btn-uncheck"} 
          onClick={handleToggle}
          title={isDone ? "Отметить как невыполненную" : "Отметить как выполненную"}
        >
      
        </button>
      </div>
    </li>
  );
};
