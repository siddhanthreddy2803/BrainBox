import React, { useState, useEffect } from 'react';
import './todo.css';
import TodoCards from './todoCards';
import Update from './Update';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const id = sessionStorage.getItem("id");
const token = sessionStorage.getItem("token") 
console.log(id);

let toUpdateArray = [];

const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);

    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const update = (value) => {
        toUpdateArray = Array[value];
    };

    const submit = async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Please fill all the fields");
            return;
        }

        if (id && token) {
            try {
                const response = await axios.post(
                    "http://localhost:3001/api/v2/addTask",
                    {
                        title: Inputs.title,
                        body: Inputs.body,
                        id,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.data && response.data.list) {
                    setArray([...Array, response.data.list]);
                    setInputs({ title: "", body: "" });
                    toast.success("Your Task is Added!");
                } else {
                    toast.error("Failed to add task. Please try again.");
                }
            } catch (error) {
                console.error("Error while adding task:", error);
                toast.error("Failed to add task. Please try again.");
            }
        } else {
            toast.error("Your task is not saved! Please Sign In.");
        }
    };

    const del = async (Cardid) => {
        if (id && token) {
            try {
                await axios.delete(`http://localhost:3001/api/v2/deleteTask/${Cardid}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Add JWT token
                    data: { id: id },
                });
                toast.success("Your Task is Deleted");
            } catch (error) {
                console.error("Error while deleting task:", error);
                toast.error("Failed to delete task. Please try again.");
            }
        } else {
            toast.error("Your task is not saved! Please Sign In.");
        }
    };

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    };

    useEffect(() => {
        if (id && token) {
            const fetch = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/v2/getTasks/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }, // Add JWT token
                    });
                    setArray(response.data.list);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                    toast.error("Failed to fetch tasks. Please try again.");
                }
            };
            fetch();
        }
    }, [submit]);

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>
                    <div className='d-flex flex-column todo-inputs-div w-75 p-1'>
                        <input
                            type='text'
                            placeholder='Title'
                            className='my-2 p-2 todo-inputs'
                            onClick={show}
                            onChange={change}
                            value={Inputs.title}
                            name='title'
                        />

                        <textarea
                            id='textarea'
                            type='text'
                            placeholder='Body'
                            className='p-2 todo-inputs'
                            value={Inputs.body}
                            onChange={change}
                            name='body'
                        />
                    </div>
                    <div>
                        <button className='btn btn-primary my-4 p-2 todo-btn' onClick={submit}>
                            Add To Brain
                        </button>
                    </div>
                </div>
                <div className='todo-body'>
                    <div className='container-fluid'>
                        <div className='row'>
                            {Array &&
                                Array.map((item, index) => (
                                    <div className='col-lg-3 col-8 mx-5 my-2' key={index}>
                                        <TodoCards
                                            title={item.title}
                                            body={item.body}
                                            id={item._id}
                                            delid={del}
                                            display={dis}
                                            updateId={index}
                                            toBeUpdate={update}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='todo-update' id='todo-update'>
                <div className="container update">
                    <Update display={dis} update={toUpdateArray} />
                </div>
            </div>
        </>
    );
};

export default Todo;
