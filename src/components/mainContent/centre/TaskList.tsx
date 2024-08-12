import React from 'react'
import { Task } from './Task'
import { BsDot } from "react-icons/bs";

export const TaskList = ({ title, color, allTasksOfList, alltasks, setallTasks }) => {
    return (
        <div className='tasklist-common taskList'>
            <div className='title-common'>
                <BsDot size={30} color={color} />
                <div className='task-list-title'>{title}</div>
                <div className='task-list-num'>{allTasksOfList.length}</div>
            </div>
            <div className='hr-common'><hr className='hr-style' /></div>

            <div className=''>
                {allTasksOfList.map((task) => {
                    return <Task title={task.title} description={task.description} deadline={task.deadline} id={task._id} alltasks={alltasks} setallTasks={setallTasks} />
                })}
            </div>
        </div>
    )
}
