export class DataModel {

    constructor(inCampaigns, inCurrentCampaign) {
        this.version = 1;
        this.campaigns = inCampaigns;
        this.currentCampaign = inCurrentCampaign;
    }
}