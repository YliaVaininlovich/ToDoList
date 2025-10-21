import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.scss";

interface FormProps {
  onAddTodo: (text: string) => void;
}

export const Form = ({ onAddTodo }: FormProps) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      onAddTodo(inputText);
      setInputText('');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            type="text" 
            value={inputText}
            onChange={handleInputChange}
            placeholder="Введите новую задачу..."
          />
          <button type="submit"></button>
        </label>
      </form>
    </div>
  );
};
