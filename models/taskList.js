export default class TaskList {
    constructor() {
        this.taskArr = [];
    }

    addTask(taskList) {
        // this.mangMonAn.push(monAn);
        this.taskArr = [...this.taskArr, taskList];
    }
}