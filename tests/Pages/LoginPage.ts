import { Page, expect } from "@playwright/test";
import { Password, UserName } from "../TestData/TestData";
import { Console } from "console";
import { CompanyModule } from "@faker-js/faker";
import { CommonBase } from "./CommonPage";

export default class LOGIN extends CommonBase

{
    constructor(page: Page) 
    {
        super(page);       
    }
    
    Email=() => this.page.locator("//input[@name='email' and @id='email']");
    Password=() => this.page.locator("//input[@name='password' and @id='password']");
    LoginButton=() => this.page.locator("//*[@id='btn_login']");
    HomeonDashbaord=() => this.page.locator("//div[@id='wrapper']//h2[contains(text(),'Home')]");
    MainonDashboard=() => this.page.locator("//small[contains(text(),'Main dashboard and quick access to platform pillars.')]");

    async LoginPage(): Promise<void>
    {
        await this.Email().fill(UserName);
        await this.Password().fill(Password);
        await this.LoginButton().click();        
        try 
        {
            console.log("Executed Try block");
            await expect(this.HomeonDashbaord()).toBeVisible();          
        } 
        catch (error) 
        {
            console.log("Executed Catch block");
            await expect(this.MainonDashboard()).toBeVisible();
            //await expect(this.page.locator(this.MainonDashboard())).toBeVisible({timeout:300*100});
            //expect (false).toBeTruthy();   
            await this.page.pause();         
        }
        
    }  
    
}







