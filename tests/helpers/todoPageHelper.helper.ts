import { Page, expect } from "@playwright/test";
import { TodoPage } from "../page/todoPageObjects.page";

export class TodoHelper {
    readonly page: Page;
    readonly todoPage: TodoPage;

    constructor(page: Page){
        this.page = page;
        this.todoPage = new TodoPage(page);
    }
    async addTask(taskName: string){
        await this.todoPage.fillTaskInput(`${taskName}`);
        await this.todoPage.newTodoInput.click();
        await this.page.keyboard.press('Enter');
        const task = await this.todoPage.taskLabel(`${taskName}`);
        await expect(task).toBeVisible({ timeout: 1 * 1000 });
    }
    async completeTask(taskName: string){
        const taskCheckbox = await this.todoPage.taskCheckbox(`${taskName}`);
        await taskCheckbox.waitFor({state:'visible', timeout: 1 * 1000});
        await taskCheckbox.click();
        const isTaskCompleted = await this.todoPage.isTaskCompleted(`${taskName}`);
        await expect(isTaskCompleted).toBeVisible({timeout: 1 * 1000});
        await expect(isTaskCompleted).toHaveClass('completed');
        
    }
    async editTask(taskName: string, newTaskName: string){
        const taskLabel = await this.todoPage.taskLabel(`${taskName}`);
        await expect(taskLabel).toBeVisible({ timeout: 1 * 1000 });
        await taskLabel.dblclick({ button:'left', delay: 200});
        const taskEditInput = await this.todoPage.taskEditInput(`${taskName}`);
        await taskEditInput.fill(`${newTaskName}`);
        await this.todoPage.heading.click();
        const newTaskLabel = await this.todoPage.taskLabel(`${newTaskName}`);
        await expect(newTaskLabel).toBeVisible();
    }

    async setFilter(filterName: string){
        const filterEl = await this.todoPage.filterEl(`${filterName}`);
        await expect(filterEl).toBeVisible();
        await filterEl.click();
    }

    async deleteTask(taskName: string){
        const taskLabelEl = this.todoPage.taskLabel(`${taskName}`);
        await expect(taskLabelEl).toBeVisible({ timeout: 1 * 1000 });
        await taskLabelEl.hover();
        const deleteTaskBtn = this.todoPage.taskDeleteBtn(`${taskName}`);
        await expect(deleteTaskBtn).toBeVisible({ timeout: 1 * 1000 });
        await deleteTaskBtn.click();
        await expect(taskLabelEl).not.toBeVisible({ timeout: 1 * 1000 });
    }
}
