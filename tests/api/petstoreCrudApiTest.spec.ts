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

    test('Create a pet', async ({ request }) => {
        const postResponse = await request.post(`${API_BASE_URL}`+`/pet`, {data: petDataSet});
        await expect(postResponse.ok()).toBeTruthy();
        await expect(postResponse.status()).toBe(200);
        const postResponseBody = await postResponse.json();
        await expect(postResponseBody.id).toBe(petDataSet.id);
        await expect(postResponseBody.name).toBe(`${petDataSet.name}`);
        await expect(postResponseBody.category.name).toBe(`${petDataSet.category.name}`); 
        await expect(postResponseBody.status).toBe(`${petDataSet.status}`); 
        console.log(postResponseBody);
    });
    
    test('Check the pet info', async ({ request }) => {
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
            await expect(putResponseBody.id).toBe(petDataSet.id);
            await expect(typeof putResponseBody.id).toBe('number');
            await expect(putResponseBody.name).toBe(`${petDataSet.name}`);
            await expect(typeof putResponseBody.name).toBe('string');
            await expect(putResponseBody.category.name).toBe(`${petDataSet.category.name}`); 
            await expect(putResponseBody.status).toBe(`taken`);
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

