import {configureStore} from "@reduxjs/toolkit"

import ToDoReducer from "./ToDoSlice"

const store = configureStore({
    reducer:{
        todo: ToDoReducer,
    },
})

export default store;



