import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type  TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValueType = "all" | "active" | "completed"


function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const addTask = (todolistId: string, taskTitle: string) => {

        const newTask: TaskType = {id: v1(), title: taskTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
        })
    }
    const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: taskTitle} : el)
        })
    }

    const changeTodoListFilter = (todolistId: string,nextFilterValue:FilterValueType)=> {
        setTodoLists(todoLists.map(tl=>tl.id === todolistId ? {...tl,filter:nextFilterValue}:tl))
    }
    const changeTodoListTitle = (todolistId: string,title:string)=> {
        setTodoLists(todoLists.map(tl=>tl.id === todolistId ? {...tl,title:title}:tl))
    }
    const addTodolist = (title:string) => {
        const newTodolist:TodoListsType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists,newTodolist])
        setTasks({...tasks,[newTodolist.id]:[]})
    }
    const removeTodolist = (todolistId:string) => {
        setTodoLists([...todoLists].filter(el=>el.id !== todolistId))
        const copyTasks = {...tasks}
        delete  copyTasks[todolistId]
        setTasks(copyTasks)

    }


    const getFilteredTasks = (tasks: Array<TaskType>,filter:FilterValueType):Array<TaskType> => {
        switch(filter){
            case "active":
                return tasks.filter(tasks => !tasks.isDone)
            case "completed":
                return tasks.filter(tasks => tasks.isDone)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map((tl: TodoListsType) =>{
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter);
      return(
          <Todolist key={tl.id}
                    todolistId={tl.id}
                    todolistTitle={tl.title}
                    todolistFilter={tl.filter}
                    tasks={filteredTasks}
                    changeTaskTitle={changeTaskTitle}

                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTodoListTitle={changeTodoListTitle}
                    removeTodolist={removeTodolist}/>


      )
    })

    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
                       {todoListsComponents}
        </div>
    );
}

export default App;
