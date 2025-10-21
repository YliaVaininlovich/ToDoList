import { useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../components/Header/Header";
import { Form } from "../components/Form/Form";
import { ToDoList } from "../components/ToDoList/ToDoLost";
import { ToDo } from "../models/todo-item";

export const ToDoListPage = () => {
  const [todos, setTodos] = useState<ToDo[]>([
    { id: 1, text: "First task", isDone: false },
    { id: 2, text: "Second task", isDone: true },
    { id: 3, text: "Third task", isDone: false },
    { id: 4, text: "Fourth task", isDone: true }
  ]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    
    const newTodo: ToDo = {
      id: todos.length + 1,
      text: text.trim(),
      isDone: false
    };
    
    setTodos([...todos, newTodo]);
    toast.success(`Задача "${text.trim()}" добавлена!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    
    if (todoToDelete) {
      toast.error(`Задача "${todoToDelete.text}" удалена!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const toggleTodo = (id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ));
    
    if (todoToToggle) {
      const newStatus = !todoToToggle.isDone;
      const statusText = newStatus ? "выполнена" : "не выполнена";
      toast.info(`Задача "${todoToToggle.text}" отмечена как ${statusText}!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleDragStart = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      toast.info(`Перетаскивание задачи "${todo.text}"`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleDragEnd = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const statusText = todo.isDone ? "выполненные" : "невыполненные";
      toast.success(`Задача "${todo.text}" перемещена в ${statusText}!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Header />
      <Form onAddTodo={addTodo} />
      <ToDoList 
        todos={todos} 
        onDeleteTodo={deleteTodo} 
        onToggleTodo={toggleTodo}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    </>
  );
};
