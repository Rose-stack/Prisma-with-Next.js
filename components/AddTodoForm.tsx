
import {useState} from 'react';
import styles from './Form.module.css';

type Props = {
    addTodo: Function;
}

const AddTodo : React.FC<Props> = ({addTodo}) => {
    const [title,setTitle] = useState('');
    const [error,setError] = useState('');
    const [message,setMessage] = useState('');


    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(!title){
            setError('Title is required');
            return;
        }
        // data composition.
        const data = {
            title
        };
        // send a request to the backend.
        fetch(
            '/api/todo',
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data),
            }
        ).then(( response ) => response.json()).then( (data ) => {            
            // reset the title.
            setTitle('');
            // set the message.
            setMessage('Todo added successfully');
            // add the todo.
            addTodo(data);
        });
    }
    return   (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                {
                    error && (
                        <div className={styles.formGroupError}>
                            {
                                error
                            }
                        </div>                        
                    )
                }
                {
                    message && (
                        <div className={styles.formGroupSuccess}>
                            {
                                message
                            }
                        </div>
                    )
                }
                <div className={styles.formGroup}>
                    <input type="text" name="title" id="title" placeholder='Title of todo' value={title} onChange={
                        (e) => setTitle(e.target.value)
                    } />
                </div>
                <div className={styles.formGroup}>
                    <button type="submit">Add Todo</button>
                </div>
            </form>
        </div>
    )   
}

export default AddTodo;