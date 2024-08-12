import React, { useEffect, useState } from 'react'
import { SideBar } from './sidebar/SideBar'
import { Centre } from './centre/Centre'
import axios from 'axios';
import toast from 'react-hot-toast';

export const MainContent = () => {
    let [allTasks, setAllTasks] = useState([{
        title: "tmp",
        description: "temporary",
        deadline: "tommorrow"
    }]);

    console.log(allTasks);

    useEffect(() => {
        const loadAllTasks = async () => {

            try {
                toast.loading("Loading tasks", { id: "allTasks" });
                let res = await axios.get("/tasks");
                if (res.status == 200) {
                    let updatedallTasks = res.data.allTasks;
                    setAllTasks(updatedallTasks);
                    console.log(updatedallTasks);
                    toast.success("Tasks loaded", { id: "allTasks" });
                }

            }
            catch (err) {
                console.log(err);
                toast.error(err.message, { id: "allTasks" });
            }
        };

        loadAllTasks();


    }, []);


    useEffect(() => {

        const wait2sec = () => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(" i waited ");
                    resolve();
                }, 10000);
            });
        }



        const loadAllTasks = async () => {

            try {
                // toast.loading("Loading tasks", { id: "allTasks" });


                let res = await axios.get("/tasks");
                if (res.status == 200) {
                    let allTasks = res.data.allTasks;
                    setAllTasks(allTasks);
                    console.log(allTasks);
                    //   toast.success("Tasks loaded", { id: "allTasks" });
                }

            }
            catch (err) {
                console.log(err);
                // toast.error(err.message, { id: "allTasks" });
            }
        };



        setInterval(() => {
            wait2sec().then(() => {
                loadAllTasks();
            })
        }, 10000)



    }, []);



    return (
        <div className='main-content'>
            <SideBar alltasks={allTasks} setallTasks={setAllTasks} />
            <Centre alltasks={allTasks} setallTasks={setAllTasks} />
        </div>
    )
}
