import { FcExpired } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import { FaClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import toast from "react-hot-toast";


export const SideBar = ({ alltasks, setallTasks }) => {
    const [showForm, setShowForm] = useState(false);
    const [showCalender, setShowCalender] = useState(false);

    let t = useRef(null);
    let desc = useRef(null);
    let dead = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newTask = {
            title: t.current.value,
            description: desc.current.value,
            deadline: dead.current.value,
            category: "To Do"
        }

        try {
            toast.loading("adding task", { id: "add" });
            console.log(desc);
            console.log(newTask);
            let res = await axios.post("/tasks", newTask);

            if (res.status == 200) {
                toast.success("task added", { id: "add" });
                setShowForm(false);
                setallTasks([...alltasks, newTask]);
                setShowCalender(false);
            }
        }
        catch (err) {
            toast.error("error", { id: "add" });
            console.log(err);
        }

        t.current.value = "";
        desc.current.value = "";
        dead.current.value = "";

    }

    let toDoTasks = alltasks.filter((task) => {
        return task.category == "To Do";
    })

    let inProgressTasks = alltasks.filter((task) => {
        return task.category == "In Progress";
    })

    let doneTasks = alltasks.filter((task) => {
        return task.category == "Done";
    })

    let timeoutTasks = alltasks.filter((task) => {
        return task.category == "Timeout";
    })

    return (
        <div className='side-bar-container'>
            <div className='common-side-style'>
                <FcExpired size={40} className="common-icon" />
                <div className="common-side-head">Expired Tasks</div>
                <div className="common-side-num">{timeoutTasks.length}</div>
            </div>
            <div className='common-side-style'>
                <FcBriefcase size={40} className="common-icon" />
                <div className="common-side-head">All Active Tasks</div>
                <div className="common-side-num">{toDoTasks.length + inProgressTasks.length}</div>
            </div>
            <div className='common-side-style'>
                <FaClock size={40} className="common-icon" />
                <div className="common-side-head">Completed Tasks</div>
                <div className="common-side-num">{doneTasks.length}/<sub>{alltasks.length}</sub></div>
            </div>

            <button className="side-btn" onClick={() => setShowForm(true)}>
                <FaPlus />
                <div className="btn-add">Add Task</div>
            </button>
            {/*form*/}
            {showForm && (
                <div className="overlay">
                    <div className="form-style">
                        <div className="form-head-container">
                            <div className="form-heading">
                                <GoDotFill color="#1e88e5" />
                                <div className="add-task-head">ADD TASK</div>
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
                                        Assigned to
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
