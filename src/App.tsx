import React, {useRef, useState} from 'react';
import {Todo} from './utils'
import List from './components/List'
import './App.css'



const App: React.FC = () => {

  // reference  
  const todoInput = useRef<HTMLInputElement>(null);

  // states
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doesExist, setDoesExist] = useState(false);
  const [todo, setTodo] = useState('');

  const todoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.value !== null || e.currentTarget.value !== undefined || e.currentTarget.value !== '') {
      console.log(e.currentTarget.value);
      setTodo(e.currentTarget.value);
    }
  }

  const addTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(todo.length > 0) {
      
      if(hasDuplicate()) {
        setDoesExist(true);
      } else {
        setDoesExist(false);

        const newTodo = {
          id: todoList.length + 1,
          work: todo
        };
  
        setTodoList(prev => [...prev, newTodo]);
  
        // clear todo
        setTodo('');  
       
        if( todoInput.current )  todoInput.current.value = '';
      }
    }
  }

  const hasDuplicate = () => {
    const duplicateFound = todoList.find(td => {
      return td.work === todo
    });

    return !!duplicateFound;
  }

  const deleteTodoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

    const updatedList = todoList.filter(todo => {
      return todo.work !== e.currentTarget.dataset.todo;
    })

    setTodoList(updatedList);
  }

  return (
    <div className="App">
      <h1>Activity list</h1>
      {doesExist ? (
        <div className="alert">Todo already exists</div>
      ) : null}
      <div className="todo-input">
        <input type="text" ref={todoInput} onChange={todoChangeHandler}/>
        <button onClick={addTodo}>Add</button>
      </div>

      <List todoList={todoList} callback={deleteTodoHandler} />

    </div>
  );
}

export default App;
