import React, { useRef, useState } from 'react'
import { ImCancelCircle } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import toast from 'react-hot-toast';

export const Task = ({ title, description, deadline, id, alltasks, setallTasks }) => {

    const [showForm, setShowForm] = useState(false);
    const [showCalender, setShowCalender] = useState(false);

    let t = useRef(null);
    let desc = useRef(null);
    let dead = useRef(null);
    let categ = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newTask = {
            title: t.current.value,
            description: desc.current.value,
            deadline: dead.current.value,
            category: categ.current.value
        }

        try {
            toast.loading("updating task", { id: "update" });
            let res = await axios.put(`/tasks/${id}`, newTask);

            if (res.status == 200) {
                toast.success("task update", { id: "update" });
                setShowForm(false);
                setallTasks([...alltasks, newTask]);
                setShowCalender(false);
            }
        }
        catch (err) {
            toast.error("error", { id: "update" });
            console.log(err);
        }

        t.current.value = "";
        desc.current.value = "";
        dead.current.value = "";
        categ.current.value = "To Do";

    }

    const handleDelete = async (e) => {

        try {
            toast.loading("deleting task", { id: "delete" });
            let res = await axios.delete(`/tasks/${id}`);

            if (res.status == 200) {
                toast.success("event deleted", { id: "delete" });
                setShowForm(false);
                alltasks = alltasks.filter((task) => task._id != id)
                setallTasks([...alltasks]);
                setShowCalender(false);
            }
        }
        catch (err) {
            toast.error("error", { id: "delete" });
            console.log(err);
        }

        t.current.value = "";
        desc.current.value = "";
        dead.current.value = "";

    }


    const checkTimeout = async () => {

        let currentDate = new Date();
        let taskDeadline = new Date(deadline);

        if (taskDeadline < currentDate) {
            try {
                await axios.put(`/tasks/${id}`, { title, deadline, description, category: 'Timeout' });
            }
            catch (err) {
                console.log(err);
            }

        }
    }

    checkTimeout();






    return (
        <>
            <div onClick={() => setShowForm(true)}>
                <div className='task-common' >
                    <div>
                        <div>
                            <div className='space'>sp</div>
                            <div className='task-common-title'>{title}</div>
                        </div>
                        <div className='task-common-desc'>{description}</div>
                        <div className='task-common-deadline'>Deadline: {deadline}</div>
                    </div>
                </div>
            </div>
            {showForm && (
                <div className="overlay">
                    <div className="form-style">
                        <div className="form-head-container">
                            <div className="form-heading">
                                <GoDotFill color="#1e88e5" />
                                <div className="add-task-head">UPDATE TASK</div>
                            </div>
                            <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                                <ImCancelCircle color="blue" />
                            </button>
                        </div>
                        <form onSubmit={async (e) => { await handleSubmit(e) }}>
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    ref={t}
                                    className="title-inp"
                                    placeholder="Title..."

                                />
                            </div>
                            <div>
                                <textarea
                                    name="description"
                                    ref={desc}
                                    placeholder="What do you want to do Today..."
                                    className="desc-style"

                                />
                                <select className="category-style" name="category" ref={categ} id="">
                                    <option value="" selected disabled>category</option>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                    <option value="Timeout">Timeout</option>
                                </select>
                            </div>
                            <div className="bottom-style">
                                {!showCalender ? (
                                    <label htmlFor="deadline" onClick={() => {
                                        setShowCalender(true)
                                    }}>
                                        Deadline
                                    </label>
                                ) : (
                                    <input
                                        type="date"
                                        name="deadline"
                                        ref={dead}
                                        id="deadline"

                                    />
                                )}
                                <div >
                                    <button className="add-btn" type="submit">
                                        Update Task
                                    </button>
                                    <button className="add-btn delete-btn" type="button" onClick={handleDelete}>
                                        Delete Task
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

/*
            <button className="side-btn" onClick={() => setShowForm(true)}>
                <FaPlus />
                <div className="btn-add">Add Task</div>
            </button>
           
            

*/