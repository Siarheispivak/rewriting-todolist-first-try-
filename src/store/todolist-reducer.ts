import {TodoListsType} from "../App";
import {v1} from "uuid";


export type ActionsType = removeTodolistACType | addTodolistACType

export const TodolistReducer = (state: Array<TodoListsType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST':{

            const newTodolist:TodoListsType = {
                id: v1(),
                title: 'New Title',
                filter: 'all'
            }
            // ([...todoLists,newTodolist])
            // setTasks({...tasks,[newTodolist.id]:[]})

            return [...state,newTodolist]
        }
        default:
            return state
    }


}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload:{
            id:todolistID
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = () => {
    return{
        type: 'ADD-TODOLIST'
    } as const
}