import { test, expect, type Locator, type Page } from '@playwright/test';

export class TodoPage{
    readonly page: Page;
    readonly heading: Locator
    readonly newTodoInput: Locator
    readonly itemFilters: Locator

    constructor(page: Page){
        this.page = page;
        this.heading = page.locator(`//h1[contains(text(),"todos")]`);
        this.newTodoInput = page.locator(`//input[@class="new-todo"]`)
        this.itemFilters = page.locator(`//ul[@class="filters"]`)
    }
    
    openTodo(){
        this.page.goto('https://demo.playwright.dev/todomvc/#');
    }

    headingVisible(){
        expect(this.heading).toBeVisible({timeout: 5 * 1000});
    }

    fillTaskInput(text:string = 'test'){
        this.newTodoInput.fill(text);
    }

    taskLabel(taskName:string = ''): Locator{ return this.page.locator(`//label[@data-testid="todo-title" and text()="${taskName}"]`);}
    taskCheckbox(taskName:string): Locator{ return this.page.locator(`//div[label[@data-testid="todo-title" and text()="${taskName}"]]/input[@aria-label="Toggle Todo" and @type="checkbox"]`);}

    isTaskCompleted(taskName:string): Locator { return this.page.locator(`//li[div[label[@data-testid="todo-title" and text()="${taskName}"]]/input[@aria-label="Toggle Todo" and @type="checkbox"] and @class="completed"]`);}
    clearCompletedBtn(): Locator{ return this.page.locator(`//button[@class="clear-completed"]`);}

    taskEditInput(taskName: string): Locator{ return this.page.locator(`//input[@class="edit" and @value="${taskName}"]`);}

    filterEl(filterName: string): Locator{ return this.page.locator(`//ul[@class="filters"]//*[text()="${filterName}"]`);}

    taskDeleteBtn(taskName: string){ return this.page.locator(`//div[label[text()="${taskName}"]]/button[@class="destroy"]`);}
}
