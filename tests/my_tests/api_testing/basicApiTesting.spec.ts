import {test, expect, request} from '@playwright/test';

test("It should be able to validate API Get Call Response", async() => {
    //act
    const apiContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com"
    });
    const responseFirst = await apiContext.get("/booking");
    console.log(await responseFirst.json());

    //assert
    expect(responseFirst.status()).toBe(200);
    expect(responseFirst.ok()).toBeTruthy();
})