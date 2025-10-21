import { ToDoListItem } from "./ToDoListItem/ToDoListItem";
import "./ToDoList.scss";
import { ToDo } from "../../models/todo-item";

interface ToDoListProps {
  todos: ToDo[];
  onDeleteTodo: (id: number) => void;
  onToggleTodo: (id: number) => void;
  onDragStart?: (id: number) => void;
  onDragEnd?: (id: number) => void;
}

export const ToDoList = (props: ToDoListProps) => {
  const { todos, onDeleteTodo, onToggleTodo, onDragStart, onDragEnd } = props;

  const failedTasks = todos.filter(item => !item.isDone);
  const completedTasks = todos.filter(item => item.isDone);

  const handleDrop = (e: React.DragEvent, targetStatus: boolean) => {
    e.preventDefault();
    const todoId = parseInt(e.dataTransfer.getData("text/plain"));
    const todo = todos.find(t => t.id === todoId);
    
    if (todo && todo.isDone !== targetStatus) {
      onToggleTodo(todoId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="todo-container">
      <ul 
        className="todo-list failed"
        onDrop={(e) => handleDrop(e, false)}
        onDragOver={handleDragOver}
      >
        <h3>Невыполненные задачи</h3>
        {failedTasks.map(item => (
          <ToDoListItem 
            key={item.id} 
            ToDoItem={item} 
            onDelete={onDeleteTodo}
            onToggle={onToggleTodo}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </ul>
      <ul 
        className="todo-list completed"
        onDrop={(e) => handleDrop(e, true)}
        onDragOver={handleDragOver}
      >
        <h3>Выполненные задачи</h3>
        {completedTasks.map(item => (
          <ToDoListItem 
            key={item.id} 
            ToDoItem={item} 
            onDelete={onDeleteTodo}
            onToggle={onToggleTodo}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </ul>
    </div>
  );
};
