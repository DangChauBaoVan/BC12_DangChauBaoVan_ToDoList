
import Task from "../models/task.js";
import TaskServices from "../services/taskServices.js";
import Validator from "../services/validator.js";


const validator = new Validator();
const taskServices = new TaskServices();

export const getEle = id => document.getElementById(id)

const renderUndoneTask = (task) =>{
    let undone = "";
    task.map(ti =>{
        undone += `
                    <li>
                        <p>${ti.taskDesc}</p>
                        <div class="groupButton">
                            <button onclick="delTask(${ti.id})"><i class="fa fa-trash-alt"></i></button>
                            <button onclick="checkTask(${ti.id})"><i class="fa fa-check-circle"></i></button>
                        </div>
                    </li>
                `;
    })
    getEle("todo").innerHTML = undone;
}

const renderTaskList = (task) => {
    let undone = "";
    let done ="";
    task.map(ti => {
        switch (ti.status) {
            case false:
                undone += `
                    <li>
                        <p>${ti.taskDesc}</p>
                        <div class="groupButton">
                            <button onclick="delTask(${ti.id})"><i class="fa fa-trash-alt"></i></button>
                            <button onclick="checkTask(${ti.id})"><i class="fa fa-check-circle"></i></button>
                        </div>
                    </li>
                `;
                break;
            case true:
                done += `
                <li>
                <p id="pTaskDone">${ti.taskDesc}</p>
                <div class="groupButton">
                    <button onclick="delTask(${ti.id})"><i class="fa fa-trash-alt"></i></button>
                    <button id="taskDone" disable><i class="fa fa-check-circle"></i></button>
                </div>
            </li>
                `;
                break;
        }

    })
    getEle("todo").innerHTML = undone;
    getEle("completed").innerHTML = done;
}
const getTaskList = () => {
    taskServices.getTask().then(result => {
        renderTaskList(result.data);
    }).catch(err => {
        console.log(err);
    })
}
getTaskList();
getEle("addItem").addEventListener("click", () => {
    let newTask = getEle("newTask").value;
    let isValid = true;
    isValid = validator.checkEmpty(newTask, "errorMessage", "You Haven't Type Anything Yet!")

    if (!isValid) return;

    const task = new Task(newTask,false);
    taskServices.addTask(task).then(function (result) {
        getTaskList();
    }).catch(function (error) {
        console.log(error);
    })
})

const delTask = (id) => {
    taskServices.deleteTask(id).then(function (result) {
        getTaskList();
    }).catch(function (error) {
        console.log(error);
    })
}
const checkTask = (id) => {
    
    taskServices.getOneTask(id).then(function (result) {
        
        const taskDesc = result.data.taskDesc;
        const task = new Task(taskDesc,true);
        taskServices.updateTask(id, task).then(function (result) {
            getTaskList();
        })
        
    })
    
    
}
window.delTask = delTask;
window.checkTask = checkTask;
const displayCurrentDate = () => {
    const today = new Date();

    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    date = moment(date).format("MMM Do YY");
    getEle("currentDate").innerHTML = date;
}
displayCurrentDate();


getEle("two").addEventListener("click",()=>{
    let undoneTask=[]
    taskServices.sortTaskAsc().then(function (result) {
        result.data.map( ti =>{
            if(ti.status === false){
                undoneTask = [...undoneTask,ti]
            }
        })
        renderUndoneTask(undoneTask);
        
    }).catch(function(error){
        console.log(error);
    })
})

getEle("three").addEventListener("click",()=>{
    let undoneTask=[]
    taskServices.sortTaskDesc().then(function (result) {
        result.data.map( ti =>{
            if(ti.status === false){
                undoneTask = [...undoneTask,ti]
            }
        })
        renderUndoneTask(undoneTask);
        
    }).catch(function(error){
        console.log(error);
    })
})
getEle("all").addEventListener("click",()=>{
    getTaskList();
})