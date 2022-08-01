import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import {useState} from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import TodoCard,{TodoProps} from '../components/Todo';
import AddTodoForm from '../components/AddTodoForm';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
    const todos = await prisma.todo.findMany({

    });
    return {
        props: { todos },
    }
}

type Props = {
    todos: TodoProps[]
}

const Home: React.FC<Props> = (props) => {
const [showAddTodo,setShowAddTodo] = useState(false);
const [todos,setTodos] = useState(props.todos);
function addTodo(todo:TodoProps){
    setTodos( [...todos,todo]);
}
async function deleteTodo(id:number){
    let response = await fetch('/api/todo/'+id,{
    method:"DELETE"
    });
    response = await response.json();
    if(response){
    // remove the todos from the list of todos.
    setTodos(
        todos.filter(todo => todo.id !== id)
    );
    }
}
return (
    <Layout>
        <Head>
        <title>Todos App</title>
        <meta name="description" content="Simple Todos App" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
        <button className={styles.addTodo} onClick={ () => setShowAddTodo(!showAddTodo)}>
            {
            showAddTodo ? "Back to Todos" : "Add todo"
            }
        </button>
        </div>
        {
        showAddTodo ? (
            <AddTodoForm  addTodo={addTodo} />
        ) : (
            todos.length > 0 ? (
            todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} deleteTodo={deleteTodo} />
            ))
            ) : (
            <div>
                <h4>You do not have any todos added.</h4>
            </div>
            )
        )
        }
    </Layout>
)
}

export default Home;

