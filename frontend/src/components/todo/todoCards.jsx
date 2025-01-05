import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoCards = ({ title, body, id, delid, display , updateId, toBeUpdate }) => {
    return (
        <div className='p-3 todo-card'>
            <div>
                <h5>{title}</h5>
                <p className='todo-card-p'>
                    {body.substring(0, 5)}...
                </p>
            </div>
            <div className='d-flex justify-content-around'>
                <div 
                    className='d-flex justify-content-around align-items-center card-icon-head px-2 py-1'
                    onClick={() => {
                        display("block")
                        toBeUpdate(updateId)
                    }}
                >
                    <FaEdit className='cardIcons' /> Edit
                </div>
                <div 
                    className='d-flex justify-content-around align-items-center card-icon-head text-danger'
                    onClick={() => delid(id)}
                >
                    <MdDelete className='cardIcons del' /> Delete
                </div>
            </div>
        </div>
    );
};

export default TodoCards;
