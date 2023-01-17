import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {FilterValueType, TasksStateType, TaskType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";


type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    todolistFilter: string
    tasks: Array<TaskType>


    addTask: (todolistId: string, taskTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, taskTitle: string) => void

    changeTodoListFilter: (todolistId: string, nextFilterValue: FilterValueType) => void
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle:(todolistId:string,todolistTitle:string)=>void
}

export const Todolist = (props: TodolistPropsType) => {

    const tasksListItems = props.tasks.length
        ? <ul>{
            props.tasks.map((t:TaskType)=>{

                const removeTaskFunction = () => {
                    props.removeTask(props.todolistId, t.id)
                }
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
                }
                const changeTaskTitle = (title:string) => {
                   props.changeTaskTitle(props.todolistId,t.id,title)
                }
                return(
                    <li key={t.id}>
                        <input onChange={changeTaskStatus}
                               type='checkbox'
                               key={t.id}
                               id={t.id}
                               checked={t.isDone}/>
                        <EditableSpan key={t.id}
                                      title={t.title}
                                      changeTitle={changeTaskTitle}/>
                        <button onClick={removeTaskFunction}>X</button>
                    </li>
                )
            })
        }</ul>
        : <span>List is Empty</span>


    const addTaskFunction = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }


    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(props.todolistId,title)
    }
    const setTodolistFilter = (filter: FilterValueType) =>
        () => props.changeTodoListFilter(props.todolistId, filter)

    return (
        <div>
            <>
                <div>
                    <EditableSpan title={props.todolistTitle} changeTitle={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>X</button>
                </div>

                <div>
                    <AddItemForm addItem={addTaskFunction}/>
                    {tasksListItems}
                </div>

                <div>
                    <button onClick={setTodolistFilter('all')}>ALL</button>
                    <button onClick={setTodolistFilter('active')}>ACTIVE</button>
                    <button onClick={setTodolistFilter('completed')}>COMPLETED</button>
                </div>
            </>
        </div>
    );
};

