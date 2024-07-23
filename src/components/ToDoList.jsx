import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } from '../Store/ToDoSlice';
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";

const ToDoList = () => {
    const dispatch = useDispatch();
    const todoList = useSelector((state) => state.todo.todoList);
    const sortCriteria = useSelector((state) => state.todo.sortCriteria);
    const [showModal, setShowModal] = useState(false);
    const [currentToDo, setCurrentToDo] = useState(null);
    const [newTask, setNewTask] = useState("");


    useEffect(() => {
        if(todoList.length > 0) {
            localStorage.setItem("todoList", JSON.stringify(todoList))
        }
    },[todoList]);

    useEffect (() =>{
        const localTodoList = JSON.parse(localStorage.getItem("todoList"));
        if(localTodoList) {
            dispatch(setTodoList(localTodoList));
        }
    },
    [])
    const handleAddTodo = () => {
        if (newTask.trim().length === 0) {
            alert("Please enter a task");
        } else {
            dispatch(addTodo({
                task: newTask,
                id: Date.now(),
                completed: false
            }));
            setNewTask("");
            setShowModal(false);
        }
    }

    const handleUpdateToDo = (id, task) => {
        if (task.trim().length === 0) {
            alert("Please enter a task");
        } else {
            dispatch(updateTodo({
                task: task,
                id: id,
            }));
            setNewTask("");
            setCurrentToDo(null);
            setShowModal(false);
        }
    }

    const handleDeleteToDo = (id) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        dispatch(setTodoList(updatedTodoList));
        localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    }

    const handleSort = (criteria) => {
        dispatch(sortTodo(criteria));
    }

    const filteredTodoList = todoList.filter((todo) => {
        if (sortCriteria === "All") return true;
        if (sortCriteria === "Completed" && todo.completed) return true;
        if (sortCriteria === "Not Completed" && !todo.completed) return true;
        return false;
    });

    const handleToggleCompleted = (id) => {
        dispatch(toggleCompleted({ id }));
    };

    return (
        <div>
            {showModal && (
                <div className='fixed w-full left-0 top-0 h-full bg-transparentBlack flex justify-center items-center'>
                    <div className='bg-white p-8 rounded-md'>
                        <input 
                            type='text' 
                            className='p-2 border rounded-md mb-4'
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder={currentToDo ? "Update your task here" : 'Enter your task here'} 
                        />
                        <div className='flex justify-between'>
                            <button 
                                className='px-4 py-2 mt-4 bg-gray-600 rounded-md'
                                onClick={() => {
                                    setShowModal(false);
                                    setCurrentToDo(null);
                                    setNewTask("");
                                }}>
                                Cancel
                            </button>
                            <button 
                                className='px-4 py-2 mt-4 bg-red-700 text-white rounded-md'
                                onClick={() => {
                                    if (currentToDo) {
                                        handleUpdateToDo(currentToDo.id, newTask);
                                    } else {
                                        handleAddTodo();
                                    }
                                }}>
                                {currentToDo ? 'Save' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex items-center justify-center flex-col'>
                {todoList.length === 0 ? (
                    <>
                        <p className='text-blue-600 font-bold text-2xl mt-8 mb-3 '>Please add todo list</p>
                    </>
                ) : (
                    <div className='container mx-auto mt-6'>
                        <div className='flex justify-center mb-6'>
                            <select onChange={(e) => handleSort(e.target.value)}>
                                <option value="All" className='text-sm'>All</option>
                                <option value="Completed" className='text-sm'>Completed</option>
                                <option value="Not Completed" className='text-sm'>Not Completed</option>
                            </select>
                        </div>
                        {filteredTodoList.map((todo) => (
                            <div key={todo.id} className='flex items-center justify-between mx-auto w-full md:w-1/2 rounded-lg bg-green-700 mb-4 px-4 py-2'>
                                <div
                                    className={`${todo.completed ? "line-through text-green-500" : "text-white"}`}
                                    onClick={() => handleToggleCompleted(todo.id)}>
                                    {todo.task}
                                </div>
                                <div className='space-x-4 text-white'>
                                    <button className='bg-blue-300 p-1 rounded-md ml-2'
                                        onClick={() => {
                                            setCurrentToDo(todo);
                                            setShowModal(true);
                                            setNewTask(todo.task);
                                        }}>
                                        <TiPencil />
                                    </button>
                                    <button className='bg-red-600 p-1 rounded-md'
                                        onClick={() => handleDeleteToDo(todo.id)}>
                                        <BsTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    className='bg-red-800 text-white px-4 py-2 mt-4 rounded-lg'
                    onClick={() => setShowModal(true)}>
                    Add list
                </button>
            </div>
        </div>
    );
}

export default ToDoList;
