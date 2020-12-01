import Foundation from './Foundation';
import Stock from './Stock';
import TableauStack from './TableauStack';
import Waste from './Waste';

export default class Facade {
    constructor(stateholder) {
        this.clickTableauStack = new TableauStack(stateholder).click
        this.clickFoundation = new Foundation(stateholder).click
        this.clickStock = new Stock(stateholder).click
        this.clickWaste = new Waste(stateholder).click
    }
}