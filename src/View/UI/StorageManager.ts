import { StartScreenState } from "./StartScreen/StartScreenContext";

export interface ConsentObject {
    prompt: string;
    confirm: () => boolean;
}

export default class StorageManager {
    static instance: StorageManager;
    static getInstance = () => {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager();
        }
        return StorageManager.instance;
    };
    hasConsent = () => {
        const consent = localStorage.getItem("consent");
        return consent && !!parseInt(consent);
    };

    giveConsent: () => ConsentObject = () => ({
        prompt: "Allow this game to store settings, so your changes will stay. No data leaves your computer.",
        confirm: () => {
            localStorage.setItem("consent", "1");
            return true;
        },
    });

    getDialog = () => (this.hasConsent() ? this.revokeConsent() : this.giveConsent());

    revokeConsent: () => ConsentObject = () => ({
        prompt: "Delete all local stored data? All settings will be lost.",
        confirm: () => {
            localStorage.clear();
            return false;
        },
    });

    store = (value: StartScreenState) => {
        if (this.hasConsent()) {
            localStorage.setItem("state", JSON.stringify(value));
        }
    };

    getPreviousState = () => {
        if (this.hasConsent()) {
            const state = localStorage.getItem("state");
            return state != null ? JSON.parse(state) : null;
        }
        return null;
    };
}
