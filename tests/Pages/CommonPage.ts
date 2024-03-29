import { Page } from "@playwright/test";
import { faker, th } from '@faker-js/faker';

let tagNameRecords: string[], tagCount: number, userIdsRecord: string[], userIdCount: number;
let AudienceCount: string[];
export class CommonBase
{

    protected page: Page;
    constructor(page: Page) 
    {
        this.page = page;
    }

    PageNextButton = () => this.page.locator("//ul[@role='menu']//a[contains(text(),'Next')]");
    AlertDisplay = () => this.page.locator("//div[@class='sweet-overlay']");
    DeleteButton = () =>
        this.page.locator("//div[@class='sweet-alert show-sweet-alert visible']//button[@id='ok_button']");
    UserProfileDropdown = () => this.page.locator("//a[@id='navbarDropdown']");
    SignOutButton = () =>
        this.page.locator(
            "//a[@id='navbarDropdown' and @aria-expanded='true']/following-sibling::ul//a[@id='logoout_carrier']",
        );
    SignOutAlertOkButton = () =>
        this.page.locator("//div[@class='sweet-alert show-sweet-alert visible']/button[@id='ok_button']");
    AllPolicyHolderButton = () => this.page.locator("//input[@id='audience_type1']");
    SpecificPolicyholdersRadioButton = () => this.page.locator("//input[@id='audience_type0']");
    SpecificTargetAudienceType = () => this.page.locator("//select[@id='targeted_audience_input']");
    UserTagsInputField = () =>
        this.page.locator("//label[text()='Select Tags']/parent::div/following-sibling::div//input[@type='search']");
    IndividualTagsRecords = () => this.page.locator("//li[text()='"+tagNameRecords[tagCount].trim()+"']");
    UserIdsInputField = () =>
        this.page.locator("//label[text()='Add User IDs']/parent::div/following-sibling::div//input[@type='search']");
    IndividualUserIdsRecords = () =>
        this.page.locator("//li[starts-with(normalize-space(text()), '" + userIdsRecord[userIdCount] + " |')]");
    FormFinishButton = () => this.page.locator("//a[contains(text(),'Finish & Publish')]");
    UploadOriginalImage = () =>
        this.page.locator("//div[@id='cropper_modal' and @aria-modal='true']//button[@id='btnFullImageUpload']");
    PostImageUploadLoader = () => this.page.locator("//div[@id='image_upload_spinner']");
    UploadCropImage = () =>
        this.page.locator("//div[@id='cropper_modal' and @aria-modal='true']//button[@id='btnCropPreview']");
    ConfirmUploadCropImage = () =>
        this.page.locator("//div[@id='cropper_modal' and @aria-modal='true']//button[@id='btnCropUpload']");
    AudienceSize = () => this.page.locator("//a[@class='tdu modal-popup-list-tagged-users']//strong");

    async commonAudienceTypeSelection(
        Audience_Segment_Type: string,
        Specific_Display_Types: string,
        User_Tag_Names: string,
        User_ID_Numbers: string,    
    ): Promise<void> {
        if (Audience_Segment_Type.trim().toLowerCase() == 'all policyholders') {
            console.log(Audience_Segment_Type);
            await this.AllPolicyHolderButton().click();
        } else if (Audience_Segment_Type.trim().toLowerCase() == 'specific policyholders') {
            console.log(Audience_Segment_Type);
            await this.SpecificPolicyholdersRadioButton().click();
            await this.SpecificTargetAudienceType().click();
            console.log("Specific Display Type is "+ Specific_Display_Types);            
            await this.SpecificTargetAudienceType().selectOption(Specific_Display_Types);
            let tagNameSplit: string = User_Tag_Names;
            tagNameRecords = tagNameSplit.split('|');
            let countRecords = tagNameRecords.length;
            console.log(countRecords);
            for (tagCount = 0; tagCount < countRecords; tagCount++) {
                console.log('Tag Names: '+tagNameRecords[tagCount]);
                await this.UserTagsInputField().fill(tagNameRecords[tagCount].trim());
                //await this.page.waitForTimeout(2000);
                await this.IndividualTagsRecords().isVisible();
                await this.IndividualTagsRecords().click();
               // let ScreenshotName: string = tagNameRecords[tagCount]+`${faker.number.int()}`;
                //await this.page.screenshot({ path:'tests/Screenshots/Screenshot'+ScreenshotName+'.jpg' });
               AudienceCount = await this.AudienceSize().allTextContents();
               console.log("Tags Audience Count is: " +AudienceCount);
            }
            let userIdsSplit: string = User_ID_Numbers;
            userIdsRecord = userIdsSplit.split('|');
            let countUserIds = userIdsRecord.length;
            console.log(countUserIds);
            for (userIdCount = 0; userIdCount < countUserIds; userIdCount++) {
                console.log('User Ids list: ' + userIdsRecord[userIdCount]);
                await this.UserIdsInputField().fill(userIdsRecord[userIdCount]);
                //await this.page.waitForTimeout(2000);
                await this.IndividualUserIdsRecords().isVisible();
                await this.IndividualUserIdsRecords().click();
               // let ScreenshotName: string = userIdsRecord[userIdCount]+`${faker.number.int()}`;
                //await this.page.screenshot({ path:'tests/Screenshots/Screenshot'+ScreenshotName+'.jpg' });
                AudienceCount = await this.AudienceSize().allTextContents();
               console.log("Users ID Audience Count is: " +AudienceCount);
            }
        } else {
            console.log(Audience_Segment_Type);
            console.log('No input provided');
        }
        console.log('Audience page details are filled and passed to next screen');
    }       
    

    async uploadingImageStep(page: Page): Promise<void> {
        console.log('Entered method Upload Image Step.');
        await page.locator("//input[@id='thumbnail_preview_img']").setInputFiles('tests/Images/LCIMage.jpg');
        await page.locator("//div[@id='cropper_modal' and @class='modal fade show']//div[@class='crop_default_btnset pt10 pb10 pr10' and not(contains(style,'display:none;'))]/button[@id='btnFullImageUpload']",).click();
    }
    
}


