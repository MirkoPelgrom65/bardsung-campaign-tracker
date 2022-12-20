import { defaultData } from "./default-data";

export class TrackerData {

    constructor(inTrackerData) {
        this.data = inTrackerData ? inTrackerData : defaultData();
    }
}