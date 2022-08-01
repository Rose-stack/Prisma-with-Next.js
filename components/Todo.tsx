import React,{useState} from 'react';
import styles from './Todo.module.css';

export type TodoProps =  { // Todo 
    id:number;
    title:string;
    completed:boolean;
}

type Props = { // Props
    todo:TodoProps;
    deleteTodo:Function
}

const Todo:React.FC<Props> = (props)  => {
  const [todo,setTodo] = useState(props.todo);
  const updateTodo = async () => {
    // data.
    const data = {
        completed:true
    };
    // Send Request to Update Todo
    let response = await fetch('/api/todo/'+todo.id,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    // Get the response
    response = await response.json();
    // Response check
    if(response){
        setTodo({
            ...todo,
            completed:true
        });
    }
  }
  return (
    <div className={styles.todoCard}>
        <h4 className={styles.title}>
            {todo.title}
        </h4>
        <p className={styles.description}>
            {
                todo.completed ? <span className={styles.completed}>Already Completed</span> : <span className={styles.notCompleted}>Not Completed</span>
            }
        </p>
        {
            !todo.completed && <button className={styles.actionBtn} onClick={() => updateTodo()}>Mark as Completed</button>
        }
        {
            todo.completed && <button className={styles.actionBtn} onClick={() => props.deleteTodo(todo.id)}>Delete Todo</button>
        }
    </div>
  )
}

export default Todo;