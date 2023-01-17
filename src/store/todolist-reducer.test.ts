import {v1} from "uuid";
import {useState} from "react";
import {TodoListsType} from "../App";
import {addTodolistAC, removeTodolistAC, TodolistReducer} from "./todolist-reducer";


test('correct todolist should be removed',()=>{
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:Array<TodoListsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    // const endState = TodolistReducer(startState,{type: 'REMOVE-TODOLIST',id:todolistID1})
    const endState = TodolistReducer(startState,removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);

})

test('new todolist should be added',()=>{
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:Array<TodoListsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = TodolistReducer(startState,addTodolistAC())

    expect(endState.length).toBe(3);
    expect(endState[0].id).toBe(todolistID1);
    expect(endState[1].id).toBe(todolistID2);

})