# Playwright Test Automation Tet Task

## setup

### Seting up the env
1. `npx` version >=10.
2. `npx init playwright@latest`.
3. `git clone` and `cd` into the repo.

### Running the tests 
- run `npx playwright test` to run the tests headlessly.
- run `npx playwright test --ui` to run the playwright test runner gui.
Both comands above run all of the tests in this project.

## Test descriptions

1. Rest API Petstore CRUD Test description and update suggestions:
- Create a seperate petstore client file where a pet API data set be declared and all the CRUD operations would have their own public classes. That way we can just call them from the spec file and use the client file to change configuration if needed easily.

- Use `dotenv` to store all sensitive and/or other way dependant configurations private. 

- Use of unique pet/enity id to prevent data colisions on stage/prod tests.

---
2. A simple graphQL querry that is sent to countries.trevorblades using POST req. then the response gets validated and data gets verified. 
- An update suggestion woulds be to create a api interface and/or the client file and query builder, that would ease the future creation of the tests and make it easily maintainable.

---
3. UI test automation on todo demo site.
- In order to make the project more easily maintainable, the UI funtional tests contain info in tests/spec test/helpers and tests/page files.

- The functions in helper file contain action blocks for ading, editing and deleting a task, and setting filters
- The functions in page file contain selectors that are defined in xpath style with modifyers that can be passed to it to point to specific element.
Potential update here would be to use playwrights built in element selector functions. It just seems to me the xpath is faster to locate and debug.

- The spec file contains a describe block that holds multiple tests for that particular webpage(todo page in this case). 
- Before each of the test we navigate to the webpage and assure it is loaded.
- Starting of with a simple add task test and continuing with editing a task, completing a task, deleting and filtering them. 
As an update I would suggest to have a submit locator on the page, so that I wouldnt need to use hardware actions to submit a task. 
