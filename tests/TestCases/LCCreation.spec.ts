import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";
import LOGIN from "../Pages/LoginPage";
import NavigatetoContentPillar from "../Pages/NavContentPillarPage";
import { sfstgurl } from "../TestData/TestData";
import LCCREATION from "../Pages/LearningCenter";

let page: Page;
let login: LOGIN
let navigatetoContentPillar: NavigatetoContentPillar
let lccreation: LCCREATION;


test.beforeAll(async ({ browser }) => 
{
  page = await browser.newPage();
  login = new LOGIN(page);
  navigatetoContentPillar = new NavigatetoContentPillar(page);
  lccreation = new LCCREATION(page);
});

test.use({
  viewport: { width: 1850, height: 895 },
  launchOptions: {
    slowMo: 300, //This option will sets the execution speed of the test.
  },
});


test.describe("LC Creation", () => 
{  
  test.setTimeout(900000);
    test(`Creationg LC with CTA Type CR`, async () => 
    {
      await test.step("URL Navigation", async () => 
      {
        await page.goto(sfstgurl);
      });      

      await test.step("Login to SF Carrier Panel", async () => 
      {
        await login.LoginPage();
      });

      await test.step("Content Pillar Navigation", async () => 
      {
        await navigatetoContentPillar.NavigatetoContentPillar();
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


