import { Component, OnInit } from '@angular/core';
import { Task } from './Models/Task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dashboard',
  templateUrl: './Dashboard.html',
})
export class DashboardComponent implements OnInit {
  mTasks: Array<Task> = new Array<Task>();
  mNewTaskName: string = '';
  mBaseURL: string = 'http://localhost:2000/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    // Get Tasks API
    this.http
      .get(`${this.mBaseURL}api/tasks?userId=1`)
      .subscribe((res: any) => {
        this.mTasks = Task.createTaskList(res.data);
      });
  }

  taskCompleted(task: Task, taskIndex: number) {
    task.beingDeleted = true;
    setTimeout(() => {
      this.mTasks.splice(taskIndex, 1);
    }, 1100);

    // Delete Task API
  }

  addTask() {
    let newTask: Task = new Task();
    newTask.taskName = this.mNewTaskName;
    //   Save Task API
  }

  emptyTextValidation() {
    return this.mNewTaskName.trim() !== '' ? false : true;
  }
}
