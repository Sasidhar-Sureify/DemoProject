import { Page, expect } from "@playwright/test";
import { time } from "console";
import { promises } from "dns";
import { test } from "node:test";
import { faker, th } from '@faker-js/faker';
import { CommonBase } from "./CommonPage";
let currentDate = new Date();
let currentTime = currentDate.toLocaleTimeString();
//let LCCategoryName: string = `LC Cat ${currentDate.toLocaleDateString()} ${currentTime}`;
let LCCategoryName : string = `LC Cat ${faker.number.int()}`;
//let LCArticleName : string = `LC Article ${faker.number.int()}`;
let YoutubeURL : string = `https://www.youtube.com/watch?v=pWCt990TDIU`;
let CopyArticleName : string;

export interface LC_records 
  {
    LC_Article_Name: string;
    //Schedule: string;
    LC_Article_Description: string;
    Video_Source: string;
    Video_URL: any;
    Audio_Described_Version: any;
    Captions_URL: any;
    Transcript: string;
    Rewards: string;
  }
  
  export const LCColumns = 
  [
    "LC_Article_Name",
    //"Schedule",
    "LC_Article_Description",
    "Video_Source",
    "Video_URL",
    "Audio_Described_Version",
    "Captions_URL",
    "Transcript",
    "Rewards", 
 ];

export default class LCCREATION extends CommonBase
{    
    
    constructor(page: Page) 
    {
        super(page);       
    }
    
    LCProcessing = () => this.page.locator("//div[@id='articles_table_processing']");
    LC=() => this.page.locator("//ul[@id='incentives-submenu']/li[@class='sub_menu_level ']/a/span[text()='Learning Center']");
    LCConfigureCategories=() => this.page.locator("//span[text()='Learning Center']/parent::a/following-sibling::ul//span[text()='Configure Categories']");

    LCNewCategory=() => this.page.locator("//a[contains(@class,'fw700')]");
    //LCNewCategory=() => this.page.locator("//a[@title='Add']");
    LCCreateCategoryName=() => this.page.locator("//input[@id = 'name']");
    LCAllPolicyholders=() => this.page.locator("//span[contains(text(), 'All policyholders')]");
    LCCreateCategorySpecificPolicyholder=() => this.page.locator("//span[contains(text(), 'Specific policyholders')]");
    LCCreateCategorySelectTags=() => this.page.locator("//input[@placeholder='Search for tags']");
    LCCreateCategoryAddUserIds=() => this.page.locator("//label[contains(text(), 'Add User IDs')]");
    LCCategoryCreateButton = () => this.page.locator("//button[@id='product_create']");
    LCCategorysettingIcon = () => this.page.locator("//ul[@id='dropdown_li']//a[contains(text(),'" + LCCategoryName + "')]/preceding-sibling::span/b",);
    LCCategoryDeleteButton = () => this.page.locator("//li[@class='category_dropdown dropdown ui-sortable-handle']//span[@aria-expanded='true']//following::li/a[@class='delete_learning_category' and contains(text(),'Delete')]");
    LCCategoryPublishButton = () => this.page.locator("//li[@class='category_dropdown dropdown ui-sortable-handle']//a[contains(text(),'"+LCCategoryName+"')]//following-sibling::ul//following::a[contains(text(),'Publish')]");
    LCCategoryYesPublishButton = () => this.page.locator("//div[@class='sweet-alert show-sweet-alert visible']//following::button[contains(text(),'Yes, publish')]");
    LCCategoryPublishOkButton = () => this.page.locator("//div[@class='sweet-alert show-sweet-alert visible']//following::button[contains(text(),'Ok')]");
    LCCategorywithTitle = () => this.page.locator("//li[@class='category_dropdown dropdown ui-sortable-handle']//a[contains(text(),'"+LCCategoryName+"')]");

    LCAddArticlebutton = () => this.page.locator("//div[@class='col-lg-10 no-padding']//following::a[contains(text(),'Add Article')]");
    LCArticleName = () => this.page.locator("//input[@class='required form-control']");
    LCCategoryDropdown = () => this.page.locator("//div[@class = 'col-md-10']//select[@name='category_id']");
    LCCategoryDropdownwithCatName = () => this.page.locator("//select[@name='category_id']//option[contains(text(),'"+LCCategoryName+"')]");
    LCImmediatelyUponPublishRadioButton = () => this.page.locator("//label[normalize-space()='Immediately upon publishing']");
    LCOnScheduledDateRadioButton = () => this.page.locator("//label[normalize-space()='On a scheduled date']");
    LCArticleDescription = () => this.page.frameLocator('#description_ifr').locator('#tinymce');
    async uploadingImageStep(page: Page): Promise<void> {
        console.log('Entered method Upload Image Step.');
        await page.locator("//input[@id='thumbnail_preview_img']").setInputFiles('tests/Images/LCIMage.jpg');
        await page.locator("//div[@id='cropper_modal' and @class='modal fade show']//div[@class='crop_default_btnset pt10 pb10 pr10' and not(contains(style,'display:none;'))]/button[@id='btnFullImageUpload']",).click();
    }
    LCVideoSource = () => this.page.locator("//select[@name='video_source']");
    LCVideoURL = () => this.page.locator("//input[@name='video_url']");
    LCAudioDescribedVersion = () => this.page.locator("//input[@name='transcript_url']");
    LCCaptionsURL = () => this.page.locator("//input[@name='caption_url']");
    LCVideoTranscriptFrame = () => this.page.frameLocator('#video_transcript_ifr').locator('#tinymce');
    LCCTATypeDropdown = () => this.page.locator("select[name='cta_type']");
    LCCTACRButtonLabel = () => this.page.locator("//input[@name='button_label']");
    LCCTACRConfirmMessage = () => this.page.locator("//textarea[@name='confirm_message']");
    LCCTAFeedbackPrompt = () => this.page.locator("//input[@name='feedback_prompt']");
    LCCTAURLLinkButtonLabel = () => this.page.locator("//input[@name='url_button_label']");
    LCCTAURLLinkURL = () => this.page.locator("//input[@name='cta_url']");
    LCCTALTAButtonLabel = () => this.page.locator("//input[@name='article_button_label']");
    LCCTALTAArticleSelection = () => this.page.locator("//select[@name='cta_article_id']");
    LCCTANavScreenButtonLabel = () => this.page.locator("//input[@name='screen_button_label']");
    LCCTANavScreenSelection = () => this.page.locator("//select[@name='page_no']");

    LCInAppRedirectCheckbox = () => this.page.locator("//input[@name='inapp_check']");
    LCDashboardCardRadioButton = () => this.page.locator("//label[normalize-space()='Dashboard Card']");
    LCInAppShortDesc = () => this.page.locator("//textarea[@name='short_description']");
    LCPopUpRadioButton = () => this.page.locator("//label[normalize-space()='Pop up']");
    LCPopupCTALabel = () => this.page.locator("//input[@name='inapp_cta_label']");

    LCRewards = () => this.page.locator("//input[@class='inapp_rewards_type' and @value='1']");
    LCNoRewards = () => this.page.locator("//input[@class='inapp_rewards_type' and @value='0']");
    LCArticleCreateButton = () => this.page.locator("//button[@id='product_create']");
    LCArticleTitle = () => this.page.locator("//*[@class='dropdown col-md-10']//a[contains(text(),'"+CopyArticleName+"')]");
    LCArticleDeletebutton = () => this.page.locator("//a[contains(text(),'"+CopyArticleName+"') and @aria-expanded='true']/following-sibling::ul//a[@id='remove_name' and contains(text(),'Delete')]");
    LCDeletePopupYes = () => this.page.locator("//div[@class='sweet-container']/div[@class='sweet-alert show-sweet-alert visible']//following::button[@id='ok_button' and contains(text(),'Yes, delete')]");

   
     async LCCategory(): Promise<void>
    {       
        await this.LC().click();
        await this.LCConfigureCategories().click();
        await expect(this.LCProcessing()).toHaveAttribute('style', 'display: none;', { timeout: 1000 * 1000 });
        await this.LCNewCategory().click();
        await this.LCCreateCategoryName().fill(LCCategoryName);
        await this.LCAllPolicyholders().click();
        //await this.LCCreateCategorySpecificPolicyholder().click();
        //await this.LCCreateCategorySelectTags().fill('Sasi_no9');
        //await this.page.waitForTimeout(4000);
        //await this.page.keyboard.press('Enter');  
        await this.LCCategoryCreateButton().click();
        await expect(this.LCProcessing()).toHaveAttribute('style', 'display: none;', { timeout: 1000 * 1000 });
        await this.LCCategorysettingIcon().click();
        await this.LCCategoryPublishButton().click();
        await this.LCCategoryYesPublishButton().click();
        await this.LCCategoryPublishOkButton().click();
        await expect(this.LCProcessing()).toHaveAttribute('style', 'display: none;', { timeout: 1000 * 1000 });
    }

    async LCArticle(
    {
    LC_Article_Name,
    //Schedule,
    LC_Article_Description,
    Video_Source,
    Video_URL,
    Audio_Described_Version,
    Captions_URL,
    Transcript,
    Rewards,
    }:LC_records): Promise<void>
    {        
        await this.LCCategorywithTitle().click();   
        await expect(this.LCProcessing()).toHaveAttribute('style', 'display: none;', { timeout: 1000 * 1000 });   
        await this.LCAddArticlebutton().click(); 
        CopyArticleName = `${LC_Article_Name} ${faker.number.int()}`;
        await this.LCArticleName().fill(CopyArticleName);
        //await this.LCArticleName().click();
        //await this.LCArticleName().innerText();

        await this.LCCategoryDropdown().click();
        //To select LC Category from Category dropdown while creating LC Article.
        await this.LCCategoryDropdown().selectOption({label: LCCategoryName});
        //await this.LCCategoryDropdownwithCatName().click();
        await this.LCImmediatelyUponPublishRadioButton().click();
        await this.LCArticleDescription().fill(LC_Article_Description);
        await this.uploadingImageStep(this.page);
        await this.LCVideoSource().click();
        //To select Youtube from Video source dropdown.
        await this.LCVideoSource().selectOption({label: Video_Source});        
        await this.LCVideoURL().fill(Video_URL);
        await this.LCAudioDescribedVersion().fill(Audio_Described_Version);
        await this.LCCaptionsURL().fill(Captions_URL);
        await this.LCVideoTranscriptFrame().fill(Transcript);
        await this.LCCTATypeDropdown().click();
        //To select Contact Requested CTA Type from CTA dropdown.
        await this.LCCTATypeDropdown().selectOption({label: 'Contact Requested'});
        await this.LCCTACRButtonLabel().fill('Continue');
        await this.LCCTACRConfirmMessage().fill('Our Team will Contact you as soon as possible!!!');
        await this.LCInAppRedirectCheckbox().click();
        await this.LCPopUpRadioButton().click();
        await this.LCPopupCTALabel().fill('Continue');
        await this.LCInAppShortDesc().fill('LC In App popup');
        if (Rewards == 'Yes') 
        {
           await this.LCRewards().click();
        } else 
        {
            await this.LCNoRewards().click();
        }        
        await this.LCAllPolicyholders().click();
        await this.LCArticleCreateButton().click();
        //await this.page.pause();

       /* try
        {
            await this.LCArticleTitle().isVisible();
            console.log('LC Article got Created and Verified Successfully');
            
        } catch (error) 
        {
            console.log(`Failed to create LC Article. Error Message is:${error.Message}`);
            
        }*/

    }

    async LCDeletion(): Promise<void>
    {
       await this.LCCategorywithTitle().click();
       console.log("clicked on LC Category Title")
       await this.LCArticleTitle().click();
       console.log("clicked on LC Article Title")
       await this.LCArticleDeletebutton().click();
       console.log("clicked on LC Article Delete button")
       await this.LCDeletePopupYes().click();
       console.log("clicked on LC Article Delete Yes button")
       await this.LCCategoryPublishOkButton().click();
       console.log("clicked on LC Article Delete success button")
       await this.LCCategorysettingIcon().click();
       await this.LCCategoryDeleteButton().click();
       await this.LCDeletePopupYes().click();
       await this.LCCategoryPublishOkButton().click();
    }   
    
}






