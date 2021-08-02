export default class TaskServices{
    getTask(){
        return axios({
            url: 'http://localhost:3000/toDoList',
            method: 'GET',
        })
    }
    addTask(task){
        return axios({
            url: 'http://localhost:3000/toDoList',
            method: 'POST',
            data: task,
        })
    }
    deleteTask(id){
        return axios({
            url: `http://localhost:3000/toDoList/${id}`,
            method: 'DELETE',
        })
    }
    getOneTask(id){
        // GET: lấy data của 1 sản phẩm dựa vào id
        return axios({
            url: `http://localhost:3000/toDoList/${id}`,
            method: 'GET',
        })
    }
    updateTask(id,task){
        return axios({
            url: `http://localhost:3000/toDoList/${id}`,
            method:"PUT",
            data:task,
        })
    }
    
    sortTaskAsc(){
        return axios({
            url: `http://localhost:3000/toDoList?_sort=taskDesc&_order=asc`,
            method:"GET",

        })
    }
    sortTaskDesc(){
        return axios({
            url: `http://localhost:3000/toDoList?_sort=taskDesc&_order=desc`,
            method:"GET",
        })
    }
}