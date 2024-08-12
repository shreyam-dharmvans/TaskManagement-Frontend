import axios from "axios";

export const loadAllTasks = async () => {
    try {
        let res = await axios.get("/tasks");

        return res;
    }
    catch (err) {

        return err;
    }
}
