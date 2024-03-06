import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";
import LOGIN from "../Pages/LoginPage";
import NavigatetoContentPillar from "../Pages/NavContentPillarPage";
import { sfstgurl } from "../TestData/TestData";
import LCCREATION from "../Pages/LearningCenter";
import { LCColumns } from "../Pages/LearningCenter";
import { parse } from "csv-parse/sync";
import { LC_fileContent, fileSep, testDataFolder } from "../Pages/CSVFile";
import path from "node:path";
import fs from "fs";

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

 const LCrecords: any = parse(LC_fileContent, {
  delimiter: ",",
  columns: LCColumns,
  fromLine: 2,
  skip_empty_lines: true,
});
console.log("LC CSV Records:", LCrecords);

let LC_csvCount: number;
LC_csvCount = LCrecords.length;
console.log("Records of LC CSV File", LCrecords);


test.describe("LC Creation", () => 
{  
  test.setTimeout(900000);
    test(`Creationg LC with CTA Type CR`, async () => 
    {
      await test.step("URL Navigation", async () => 
      {
        await page.goto(sfstgurl);
        /*try 
        {
          await page.goto(sfstgurl);
          console.log("URL got Launched");
        } 
        catch (error) 
        {
          
        }*/
        
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
        for (let i = 0; i < LC_csvCount; i++)
        {
        await lccreation.LCArticle(LCrecords[i]);
        }
      });

      await test.step("LC Article Deletion", async() =>
      {
        await lccreation.LCDeletion();
      });

    });

});


