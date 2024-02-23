import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";
import LCCREATION from "./Login";

let page: Page;
let lccreation: LCCREATION;

let sfuaturl: string = "https://sfuat.sureify.com";
let sfstgurl: string = "https://statefarmstg.sureify.com";


test.beforeAll(async ({ browser }) => 
{
  page = await browser.newPage();
  lccreation = new LCCREATION(page);
});

test.use({
  viewport: { width: 1850, height: 895 },
  launchOptions: {
    slowMo: 300, //This option will sets the execution speed of the test.
  },
});

test.describe("Login for State Farm STG Carrier Panel", () => 
{  
  test.setTimeout(900000);
    test(`Login`, async () => 
    {
      await test.step("URL Navigation", async () => 
      {
        await page.goto(sfstgurl);
      });      

      await test.step("Login to SF Carrier Panel", async () => 
      {
        await lccreation.LoginPage();
      });

      await test.step("Content Pillar Navigation", async () => 
      {
        await lccreation.NavigatetoContentPillar();
      });

      await test.step("LC Category Creation", async () => 
      {
        await lccreation.LCCategory();
      });

      await test.step("LC Article Creation", async () => 
      {
        await lccreation.LCArticle();
      });

    });

});


