import { TrackerData } from "../models/tracker-data";
import { BehaviorSubject } from 'rxjs';

export const ENCOUNTER_STATE = 0;
export const PATHWAY_STATE = 1;
export const GOAL_STATE = 2;

export const HEALING_VALUE = 0;
export const TOOLKIT_VALUE = 1;
export const CHARM_VALUE = 2;
export const FIREWOOD_VALUE = 3;
export const REPUTATION_VALUE = 4;
export const NOTES_VALUE = 5;


export function getChapterList() {

    return new Promise((resolve) => {
        resolve(trackerData.data.campaigns[trackerData.data.currentCampaign].chapters);
    });
}

export function getChapter(inId) {

    return new Promise((resolve) => {
        resolve(_findChapter(inId));
    });
}

export function saveChapters() {

    return new Promise((resolve) => {
        window.localStorage.setItem('bardsung-progression', JSON.stringify(trackerData.data))
        resolve();
    });
}

export function updateChapter(inChapter) {

    if (inChapter) {
        // Replace the current chapter data with the new chapter
        const index = trackerData.data.campaigns[trackerData.data.currentCampaign].chapters.findIndex(inDataChapter => {
            return inDataChapter.id === inChapter.id;
        });
        if (index >= 0) {
            trackerData.data.campaigns[trackerData.data.currentCampaign].chapters[index] = inChapter;
        }
    }

    return saveChapters();
}



export function broadcastUpdate() {
    dataBehaviour.next(trackerData.data);
}


export function updateState(inStateLabel, inChapterId, inIndex, inState) {
    switch (inStateLabel) {
        case ENCOUNTER_STATE: 
            _findChapter(inChapterId).encounters[inIndex].state = inState;
            break;
        case PATHWAY_STATE: 
            _findChapter(inChapterId).pathways[inIndex].state = inState;
            break;
        case GOAL_STATE: 
            _findChapter(inChapterId).goals[inIndex].state = inState;
            break;
    }
    saveChapters();
}

export function updateValue(inValueLabel, inChapterId, inValue) {
    switch (inValueLabel) {
        case HEALING_VALUE: 
            _findChapter(inChapterId).activeHealingPotions = inValue; 
            break;
        case CHARM_VALUE: 
            _findChapter(inChapterId).activeCharms = inValue;
            break;
        case FIREWOOD_VALUE: 
            _findChapter(inChapterId).activeFirewood = inValue;
            break;
        case TOOLKIT_VALUE: 
            _findChapter(inChapterId).activeToolkit = inValue;
            break;
        case REPUTATION_VALUE: 
            _findChapter(inChapterId).reputationScore = inValue;
            break;
        case NOTES_VALUE:
            _findChapter(inChapterId).notes = inValue;
            break;
    }
    saveChapters();
}

export function subscribeToChapter(inFunction) {
    dataBehaviour.subscribe(inFunction)
}
function _findChapter(inId) {
    return trackerData.data.campaigns[trackerData.data.currentCampaign].chapters.find((inItem) => inItem.id === inId)
}

const storage = window.localStorage.getItem('bardsung-progression');
const data = JSON.parse(storage);
const trackerData = new TrackerData(data);
const dataBehaviour = new BehaviorSubject(trackerData.data);