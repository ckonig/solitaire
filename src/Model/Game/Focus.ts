import Card from "../Deck/Card";
import Settings from "./Settings";

export default class Focus {
    settings: Settings;
    card: Card | null;
    stack: string;
    keyboard: boolean;
    player: number;
    constructor(settings: Settings, player: number) {
        this.settings = settings;
        this.card = null;
        this.stack = "";
        this.keyboard = false;
        this.player = player;
    }

    validSettings = () => this.settings.launchSettings.players[this.player].inputMethod !== "mouse";

    isKeyBoard = (isKeyboard: boolean) => {
        this.keyboard = isKeyboard;
    };

    setCard = (card: Card) => {
        this.card = card;
        this.stack = "";
    };

    unsetCard = (card: Card) => {
        if (this.card && card && Card.equals(this.card, card)) {
            this.card = null;
        }
    };

    unsetStack = (stack: string) => {
        if (this.stack && stack && this.stack === stack) {
            this.stack = "";
        }
    };

    setStack = (stack: string) => {
        this.card = null;
        this.stack = stack;
    };

    hasCard = (card: Card) => this.keyboard && this.validSettings() && !!this.card && !!card && Card.equals(this.card, card);

    hasStack = (stack: string) => this.keyboard && this.validSettings() && this.stack && stack && this.stack === stack;
}
