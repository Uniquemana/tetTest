import { Page, expect, request, test } from "@playwright/test";

let API_BASE_URL='https://petstore.swagger.io/v2'
let petID = '12'
let petName = 'testy'

test.describe('API petstore CRUD test', () => {
    test('Create a pet, read and update its info, and delete pet record', async () => {
        const apiRequest = await request.newContext();
        const postResponse = await apiRequest.post(`${API_BASE_URL}`+`/pet`, {
            data:
                {
                "id": `${petID}`,
                "category": {
                    "id": 666,
                    "name": "dog"
                },
                "name": `${petName}`,
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                    "id": 1,
                    "name": "string"
                    }
                ],
                "status": "taken"
                }
        });
        await expect(postResponse.ok()).toBeTruthy();
        await expect(postResponse.status()).toBe(200);
        const postResponseBody = await postResponse.json();
        await expect(postResponseBody.id).toBe(12);
        await expect(postResponseBody.name).toBe('testy');
        await expect(postResponseBody.category.name).toBe('dog'); 
        
        //Did not want to use an empty funtion timeout
        try{
            const getResponse = await apiRequest.get(`${API_BASE_URL}`+`/pet`+`/${petID}`);
            await expect(getResponse.ok()).toBeTruthy();
            await expect(getResponse.status()).toBe(200);
            const getResponseBody = await getResponse.json();
            await expect(getResponseBody.id).toBe(12);
            await expect(getResponseBody.name).toBe('testy');
            await expect(getResponseBody.category.name).toBe('dog');
        } catch(e){
            const getResponse = await apiRequest.get(`${API_BASE_URL}`+`/pet`+`/${petID}`);
            await expect(getResponse.ok()).toBeTruthy();
            await expect(getResponse.status()).toBe(200);
            const getResponseBody = await getResponse.json();
            await expect(getResponseBody.id).toBe(12);
            await expect(getResponseBody.name).toBe('testy');
            await expect(getResponseBody.category.name).toBe('dog');
        }
        
        
        const putResponse = await apiRequest.put(`${API_BASE_URL}`+`/pet`, {
            data:
                {
                "id": `${petID}`,
                "status": "available"
                }
        });
        const putResponseBody = putResponse.json();


        const delResponse = await apiRequest.delete(`${API_BASE_URL}`+`/pet`+`/${petID}`)
        await expect(delResponse.ok()).toBeTruthy();
        await expect(delResponse.status()).toBe(200);
        const delResponseBody = await delResponse.json();
        await expect(delResponseBody.code).toBe(200);
        await expect(delResponseBody.message).toBe(`${petID}`);
        
    });

    // test('Read the pet info', async () => {
    //     const apiRequest = await request.newContext();
    //     // const getResponse = await apiRequest.get(`${API_BASE_URL}`+`/pet`+`/${petID}`);
    //     // await expect(getResponse.ok()).toBeTruthy();
    //     // await expect(getResponse.status()).toBe(200);
    //     // const responseBody = await getResponse.json();
    //     // console.log(responseBody);

    //     // expect(responseBody.id).toBe(12);
    //     // expect(responseBody.name).toBe('testy');
    //     // expect(responseBody.category.name).toBe('dog');
    // });

    // test('Update pet info', async () => {
    //     const apiRequest = await request.newContext();
    //     const putResponse = await apiRequest.put(`${API_BASE_URL}`+`/pet`, {
    //         data:
    //             {
    //             "id": `${petID}`,
    //             "status": "available"
    //             }
    //     });
    //     const responseBody = putResponse.json();
    //     console.log(responseBody);
    // });
});
