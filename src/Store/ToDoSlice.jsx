import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoList: [],
        sortCriteria: 'All'
    },
    reducers: {
        setTodoList: (state, action) => {
            state.todoList = action.payload;
        },
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },
        updateTodo: (state, action) => {
            const { id, task } = action.payload;
            const todo = state.todoList.find((todo) => todo.id === id);
            if (todo) {
                todo.task = task;
            }
        },
        toggleCompleted: (state, action) => {
            const { id } = action.payload;
            const todo = state.todoList.find((todo) => todo.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        sortTodo: (state, action) => {
            state.sortCriteria = action.payload;
        }
    }
});

export const { setTodoList, addTodo, updateTodo, toggleCompleted, sortTodo } = todoSlice.actions;

export default todoSlice.reducer;
