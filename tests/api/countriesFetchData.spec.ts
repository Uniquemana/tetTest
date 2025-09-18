import { expect, test, request } from "@playwright/test";

let API_BASE_URL = 'https://countries.trevorblades.com'

test.describe('Fetching countries data', () => {

    test('Fetch data from US country and validate the response', async () => {
        const apiRequest = await request.newContext();
        const query = `
            query getCountry {
            country(code: "LV") {
                code
                name
                capital
                currency
                }
            }
        `;
        const response = await apiRequest.post(`${API_BASE_URL}`, { data: { query }, });
        await expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        console.log(responseBody);
        await expect(response.status()).toBe(200);

        await expect(responseBody).toHaveProperty('data.country');
        await expect(responseBody.data.country.code).toBe('LV');
        await expect(responseBody.data.country.name).toBe('Latvia');
        await expect(responseBody.data.country.capital).toBe('Riga');
        await expect(responseBody.data.country.currency).toBe('EUR');
    });
});