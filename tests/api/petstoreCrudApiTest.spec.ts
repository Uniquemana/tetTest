import { expect, test, APIRequestContext } from "@playwright/test";

test.describe.serial('API petstore CRUD test', () => {
    const API_BASE_URL='https://petstore.swagger.io/v2'
    let api: APIRequestContext;
    const petDataSet = {
        id: 12,
        category: { id: 666, name: 'dog'},
        name: 'Testy',
        photoUrls: [],
        tags: [{id: 1, name: 'bigDog'}],
        status: "available",
    };

    test.beforeAll(async ({ request }) => { api = request; });

    test('Create a pet, read and update its info, and delete pet record', async ({ request }) => {
        const postResponse = await request.post(`${API_BASE_URL}`+`/pet`, {data: petDataSet});
        await expect(postResponse.ok()).toBeTruthy();
        await expect(postResponse.status()).toBe(200);
        const postResponseBody = await postResponse.json();
        await expect(postResponseBody.id).toBe(petDataSet.id);
        await expect(postResponseBody.name).toBe(`${petDataSet.name}`);
        await expect(postResponseBody.category.name).toBe(`${petDataSet.category.name}`); 
        console.log(postResponseBody);

    });
    
    test('Greate a GET request', async ({ request }) => {
        await expect.poll(async () => {
            const getResponse = await request.get(`${API_BASE_URL}`+`/pet`+`/${petDataSet.id}`);
            const getResponseBody = await getResponse.json();
            console.log(getResponseBody);
            return getResponse.status();
        }, {
            timeout: 4 * 1000,
        }).toBe(200);
    });
        
    test('Greate a PUT request', async ({ request }) => {
        await expect.poll(async () => {  
            const putResponse = await request.put(`${API_BASE_URL}`+`/pet`, { 
            data:
                {
                    id: 12,
                    category: { id: 666, name: 'dog'},
                    name: 'Testy',
                    photoUrls: [],
                    tags: [{id: 1, name: 'bigDog'}],
                    status: "taken",
                }
            })
            const putResponseBody = await putResponse.json();
            console.log(putResponseBody);
            return putResponse.status();
        }, {
            timeout: 4 * 1000,
        }).toBe(200);

    });

    test('Create a DELETE request', async ({ request }) => {
        const delResponse = await request.delete(`${API_BASE_URL}`+`/pet`+`/${petDataSet.id}`)
        await expect(delResponse.ok()).toBeTruthy();
        await expect(delResponse.status()).toBe(200);
        const delResponseBody = await delResponse.json();
        console.log(delResponseBody);
        await expect(delResponseBody.code).toBe(200);
        await expect(delResponseBody.message).toBe(`${petDataSet.id}`);

        //Verify if the pet info is deleted
        await expect.poll(async () => {
            const getResponse = await request.get(`${API_BASE_URL}`+`/pet`+`/${petDataSet.id}`);
            const getResponseBody = await getResponse.json();
            console.log(getResponseBody);
            return getResponse.status();
        }, {
            timeout: 4 * 1000,
        }).toBe(404); 
        
    });

}); 

