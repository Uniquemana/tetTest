import { test, expect, Page } from "@playwright/test";
import { TodoPage } from "../page/todoPageObjects.page";
import { TodoHelper } from "../helpers/todoPageHelper.helper";

test.describe('Playwright demo site functional test automation', () => {
    let todoPage: TodoPage;
    let todoHelper: TodoHelper;
    
    test.beforeEach(async ({ page })=> {
        todoPage = new TodoPage(page);
        todoHelper = new TodoHelper(page);
        await todoPage.openTodo();
        await todoPage.headingVisible();
    });

    test('Create and complete a task', async () => {
        await todoHelper.addTask('task1');
        await todoHelper.completeTask('task1');

        const clearCompleted = await todoPage.clearCompletedBtn();
        await expect(clearCompleted).toBeVisible({ timeout: 1 * 1000 });
        await clearCompleted.click();
        await expect(todoPage.taskLabel(`task1`)).not.toBeVisible({ timeout: 1 * 1000 });
    });

    test('Edit a task', async () => {
        await todoHelper.addTask('task2');
        await todoHelper.editTask('task2', 'task3');
    });

    test('Multiple task filtering', async () => {
        for (let i = 1; i < 9; i++) {
            await todoHelper.addTask(`test${i}`);
        }
        for (let x = 1; x < 5; x++) {
            await todoHelper.completeTask(`test${x}`);
        }

        await todoHelper.setFilter('Active');
    
        for (let j = 1; j < 5; j++) {
            const completedTasks = await todoPage.taskLabel(`test${j}`);
            await expect(completedTasks).not.toBeVisible({ timeout: 1 * 1000 });
        }
        for (let k = 5; k < 9; k++) {
            const activeTasks = await todoPage.taskLabel(`test${k}`);
            await expect(activeTasks).toBeVisible({ timeout: 1 * 1000 });
        }
        
        await todoHelper.setFilter('Completed');

        for (let l = 1; l < 5; l++) {
            const completedTasks = await todoPage.taskLabel(`test${l}`);
            await expect(completedTasks).toBeVisible({ timeout: 1 * 1000 });
        }
        for (let n = 5; n < 9; n++) {
            const activeTasks = await todoPage.taskLabel(`test${n}`);
            await expect(activeTasks).not.toBeVisible({ timeout: 1 * 1000 });
        }

        await todoHelper.setFilter('All');

        for (let m = 1; m < 9; m++) {
            const shownTask = await todoPage.taskLabel(`test${m}`);
            await expect(shownTask).toBeVisible({ timeout: 1 * 1000 });
        }
    });

    test('Delete a task', async () => {
        await todoHelper.addTask('test1');
        await todoHelper.deleteTask('test1');
    });

    test('Edit a completed task', async () => {
        await todoHelper.addTask('test1');
        await todoHelper.completeTask('test1');
        await todoHelper.editTask('test1', 'test1--EDITED_AFTER_COMLETION');
    });
});