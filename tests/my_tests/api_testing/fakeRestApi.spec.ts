import { test, expect } from '@playwright/test';

test.describe("Basic API Request Tests", () => {
    //arrange
    test.use({ baseURL: 'https://fakerestapi.azurewebsites.net/' });

    test("It should return a successful response for first Book with the correct data", async ({ request }) => {
        //arrange
        const response = await request.get("api/v1/Books/1");
        const body = await response.json();

        //act

        //assert
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(body.id).toBe(1);
        expect(body.title).toBe("Book 1");
    });

    test.only("It should validate POST API response", async ({ request }) => {
        //arrange 
        const postAPIResponse = await request.post("api/v1/Books", {
            data: {
                "title": "Testing Book Title",
                "description": "Testing Book Description",
                "pageCount": 1337,
                "excerpt": "string",
                "publishDate": "1988-02-25T14:14:50.130Z"
            }
        });

        //act
        const postAPIResponseBody = await postAPIResponse.json();
        console.log(postAPIResponseBody);

        //assert
        expect(postAPIResponse.ok()).toBeTruthy();
        expect(postAPIResponse.status()).toBe(200);
        expect(postAPIResponseBody.title).toBe("Testing Book Title");
    });
});