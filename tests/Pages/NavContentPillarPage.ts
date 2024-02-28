import { Page, expect } from "@playwright/test";
export default class NavigatetoContentPillar

{
    static NavigatetoContentPillar() {
      throw new Error("Method not implemented.");
    }    
    protected page: Page;
    constructor(page: Page) 
    {
        this.page = page;
    }

    Contentpillar=() => this.page.locator("//*[@id='incentives-submenu' and contains(text(),'Content')]");
    ContentPillarProcessing = () => this.page.locator("//div[@id='rewards_config_table_processing']");

    async NavigatetoContentPillar(): Promise<void>
    {
        await this.Contentpillar().click(); 
        await expect(this.ContentPillarProcessing()).toHaveAttribute('style', 'display: none;', { timeout: 1000 * 1000 });            
    } 
    
}







