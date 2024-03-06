import { Page } from "@playwright/test";

export class CommonBase
{

    protected page: Page;
    constructor(page: Page) 
    {
        this.page = page;
    }

}


