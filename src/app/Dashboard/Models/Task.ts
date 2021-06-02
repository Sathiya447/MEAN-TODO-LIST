export class Task {
  public taskName!: string;
  public userId!: number;
  public taskId!: number;

  // UI Only fields
  public beingDeleted: boolean = false;

  static createTask(res: Task) {
    let t: Task = new Task();
    if (res) {
      Object.assign(t, res);
    }
    return t;
  }

  static createTaskList(resList: Array<Task>): Array<Task> {
    let tList: Array<Task> = new Array<Task>();
    if (resList) {
      resList.forEach((res) => {
        tList.push(Task.createTask(res));
      });
    }
    return tList;
  }
}
