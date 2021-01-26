import React from 'react';
import {Todo} from '../utils'

interface Props {
    todoList: Todo[],
    callback: any
}

const List: React.FC<Props> = ({todoList, callback}) => {

    return (<>    
    {todoList.length > 0 ? (
        todoList.map((todo) => {
          return (
            <div className='todo-list' key={todo.id}>
              <span>{todo.work}</span>
              <button data-id={todo.id} data-todo={todo.work} onClick={callback}>X</button>
            </div>
          )
        })
      ) : null}
    </>);
}

export default List;