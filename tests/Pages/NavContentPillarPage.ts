import { Page, expect } from "@playwright/test";
import { CommonBase } from "./CommonPage";
export default class NavigatetoContentPillar extends CommonBase

{
    static NavigatetoContentPillar() {
      throw new Error("Method not implemented.");
    }    
    
    constructor(page: Page) 
    {
        super(page);       
    }

    Contentpillar=() => this.page.locator("//*[@id='incentives-submenu' and contains(text(),'Content')]");
    ContentPillarProcessing = () => this.page.locator("//div[@id='rewards_config_table_processing']");

    async NavigatetoContentPillar(): Promise<void>
    {
        await this.Contentpillar().click(); 
        await expect(this.ContentPillarProcessing()).toHaveAttribute('style', 'display: none;', { timeout: 1000 * 1000 });            
    } 
}







