import React, { useState } from 'react'
import { TaskList } from './TaskList'

export const Centre = ({ alltasks, setallTasks }) => {
    let [slide, setSlide] = useState(false);

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

    const toggleSlide = () => {
        setSlide(!slide);
    }


    return (
        <div className='centre-container'>
            <input className="slider-style" type="range" min={0} max={1} step={1} onChange={toggleSlide} />
            <div className='centre-style'>
                {!slide &&
                    <TaskList color={"blue"} title={"To Do"} allTasksOfList={toDoTasks} alltasks={alltasks} setallTasks={setallTasks} />}
                <TaskList color={"yellow"} title={"On Progress"} allTasksOfList={inProgressTasks} alltasks={alltasks} setallTasks={setallTasks} />
                <TaskList color={"green"} title={"Done"} allTasksOfList={doneTasks} alltasks={alltasks} setallTasks={setallTasks} />

                {slide &&
                    <TaskList color={"red"} title={"Timeout"} allTasksOfList={timeoutTasks} alltasks={alltasks} setallTasks={setallTasks} />}

            </div>
        </div>
    )
}
