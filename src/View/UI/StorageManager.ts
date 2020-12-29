import { StartScreenState } from "./StartScreen/Context";

export default class StorageManager {
    hasConsent = () => {
        const consent = localStorage.getItem("consent");
        return consent && !!parseInt(consent);
    };

    giveConsent = () => ({
        prompt: "Allow this game to store settings, so your changes will stay. No data leaves your computer.",
        confirm: () => {
            localStorage.setItem("consent", "1");
        },
    });
    revokeConsent = () => ({
        prompt: "Delete all local stored data? All settings will be lost.",
        confirm: () => {
            localStorage.clear();
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
