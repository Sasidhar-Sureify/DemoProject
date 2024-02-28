import { th } from "@faker-js/faker";
import { Page, expect } from "@playwright/test";
import { Password, UserName } from "../TestData/TestData";

export default class LOGIN

{
    protected page: Page;
    constructor(page: Page) 
    {
        this.page = page;
    }
    
    Email=() => this.page.locator("//input[@name='email' and @id='email']");
    Password=() => this.page.locator("//input[@name='password' and @id='password']");
    LoginButton=() => this.page.locator("//*[@id='btn_login']");
    HomeonDashbaord=() => "//div[@id='wrapper']//h2[contains(text(),'Home')]";

    async LoginPage(): Promise<void>
    {
        await this.Email().fill(UserName);
        await this.Password().fill(Password);
        await this.LoginButton().click();
        await expect(this.page.locator(this.HomeonDashbaord())).toBeVisible({timeout:300*1000});
    }  
    
}







