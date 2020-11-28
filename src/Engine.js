import { getDeck, getStacks, CardRange } from './CardTypes';

export default class Engine {
    constructor(stateholder) {
        this.stateHolder = stateholder;
    }

    onTargetStackClick = (index) => {
        console.log(index, this.stateHolder.state.targetStacks);
        if (this.stateHolder.state.currentCard !== null) {
            if (this.stateHolder.state.targetStacks[index].icon == this.stateHolder.state.currentCard.props.type.icon) {
                var currentAccepted = this.stateHolder.state.targetStacks[index].acceptedCards[this.stateHolder.state.targetStacks[index].acceptedCards.length - 1];
                if (currentAccepted == this.stateHolder.state.currentCard.props.face) {
                    this.stateHolder.setState((state, props) => {
                        if (state.targetStacks[index].stack.indexOf(this.stateHolder.state.currentCard) == -1) {
                            this.removeFromAll(this.stateHolder.state.currentCard)
                            state.targetStacks[index].stack.push(this.stateHolder.state.currentCard);
                            state.targetStacks[index].acceptedCards.pop();
                        }
                        return { ...state, currentCard: null };
                    });
                } else {
                    //@todo blink via state machine model(?)
                    //this.blinkRed();
                }
            } else {
                //this.blinkRed();
            }
        }
    }

    removeFromAll(card) {
        this.removeFromMainStack(card);
        this.removeFromPlayStack(card);
        this.removeFromBoardStacks(card);
    }

    removeFromPlayStack = (card, callback) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                console.debug('removeFromPlayStack')
                console.debug('  before ' + state.playStack.length)
                console.debug('    peek: ', state.playStack[state.playStack.length - 1] && state.playStack[state.playStack.length - 1].toString())
                var filtered = state.playStack.filter((value, index, arr) => {
                    return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
                });

                state.playStack = filtered;
                console.debug('  after ' + state.playStack.length)
                return { ...state };
            }, () => {
                callback && callback()
            });
    }

    removeFromBoardStacks = (card, callback) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                console.debug('removeFromBoardStacks')
                state.stacks = this.filterOut(state.stacks, card);
                return { ...state };
            }, () => {
                callback && callback()
            });
    }

    removeFromMainStack = (card, callback) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                console.debug('removeFromMainStack')
                var filtered = state.stack.filter((value, index, arr) => {
                    return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
                });
                state.stack = filtered;
                return { ...state };
            }, () => {
                callback && callback()
            });
    }

    unselect = () => {
        this.stateHolder.setState((state, props) => {
            console.debug('unselect')
            return { ...state, currentCard: null };
        });
    }

    requestReset = () => {
        this.stateHolder.setState((state, props) => {
            console.debug('requestReset')
            console.debug('  before transfer', this.stateHolder.state.stack.length, this.stateHolder.state.playStack.length);
            state.stack = [...state.playStack].reverse();
            state.playStack = [];
            console.debug('after transfer')
            console.debug(state.stack.length, state.playStack.length);
            return { ...state };
        });
    }

    setCurrentCard = (card) => {
        if (this.stateHolder.state.currentCard == null) {
            this.stateHolder.setState((state, props) => {
                console.debug('setCurrentCard set')
                return { ...state, currentCard: card };
            });
        } else if (this.stateHolder.state.currentCard == card) {
            this.stateHolder.setState((state, props) => {
                console.debug('setCurrentCard unset')
                return { ...state, currentCard: null };
            });
        }
    }

    addToPlayStack = (card) => {
        console.debug('addToPlayStack')
        if (this.stateHolder.state.currentCard != null && this.stateHolder.state.currentCard != card) {
            if (this.stateHolder.state.currentCard != null && this.stateHolder.state.stack.indexOf(card) == -1
                && this.stateHolder.state.stack[this.stateHolder.state.stack.length - 1].face == this.stateHolder.state.currentCard.props.face
                && this.stateHolder.state.stack[this.stateHolder.state.stack.length - 1].type.icon == this.stateHolder.state.currentCard.props.type.icon
            ) {
                console.debug("  #1");
                console.debug('   way before', this.stateHolder.state.playStack.length, this.stateHolder.state.stack.length);
                this.stateHolder.setState((state, props) => {
                    console.debug('   before', state.playStack.length, state.stack.length);
                    var current = state.currentCard;
                    var top = state.stack[state.stack.length - 1];
                    if (current && top && top.face == current.props.face && top.type.icon == current.props.type.icon) {
                        state.playStack.push(state.stack.pop());
                    }
                    console.debug('   after', state.playStack.length, state.stack.length);
                    return { ...state, currentCard: null };
                }, () => {
                    console.debug('   way after', this.stateHolder.state.playStack.length, this.stateHolder.state.stack.length);
                });
            }
        } else if (card && this.stateHolder.state.currentCard == card) {
            console.debug("  #2");
            this.unselect();
        } else if (card && this.stateHolder.state.currentCard == null) {
            console.debug("  #3");
            this.stateHolder.setState((state, props) => {
                state.currentCard = card;
                return { ...state };
            });
        }
    }

    validateBoardStackMove = (current, top) => {
        console.debug('validateBoardStackMove')
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.props.face);
        var topIndex = range.indexOf(top.props.face);
        console.debug('comparing ' + currentIndex + ' to ' + topIndex)
        return (currentIndex + 1) == topIndex && (current.props.type.color != top.props.type.color);
    }

    onBoardStackClick = (card, index) => {
        console.debug('onBoardStackClick')
        console.debug(this.stateHolder.state);
        if (card && this.stateHolder.state.currentCard != null && this.stateHolder.state.currentCard != card) {
            if (this.validateBoardStackMove(this.stateHolder.state.currentCard, card)) {
                this.stateHolder.setState((state, props) => {
                    if (this.stateHolder.state.currentCard != null && this.stateHolder.state.stacks[index].indexOf(this.stateHolder.state.currentCard.props) == -1) {
                        state.stacks = this.filterOut(state.stacks, this.stateHolder.state.currentCard)
                        state.stacks[index].push(state.currentCard.props);
                        return { ...state };
                    }
                }, () => {
                    this.removeFromPlayStack(this.stateHolder.state.currentCard);
                    this.removeFromMainStack(this.stateHolder.state.currentCard);
                    this.unselect();
                });
            } else {
                // this.blinkRed(); @todo fix
            }
        }

        if (!card && this.stateHolder.state.currentCard && this.stateHolder.state.currentCard.props && this.stateHolder.state.currentCard.props.face == 'K') {
            this.stateHolder.setState((state, props) => {
                if (this.stateHolder.state.currentCard != null && this.stateHolder.state.stacks[index].indexOf(this.stateHolder.state.currentCard.props) == -1) {
                    this.removeFromPlayStack(this.stateHolder.state.currentCard);
                    this.removeFromMainStack(this.stateHolder.state.currentCard);
                    state.stacks = this.filterOut(state.stacks, this.stateHolder.state.currentCard)
                    state.stacks[index].push(this.stateHolder.state.currentCard.props);
                    return { ...state, currentCard: null };
                }
            }, () => {
                this.removeFromPlayStack(this.stateHolder.state.currentCard);
                this.removeFromMainStack(this.stateHolder.state.currentCard);
                this.unselect();
            });
        }

        this.setCurrentCard(card);
    }

    filterOut(stacks, card) {
        for (var i = 0; i < stacks.length; i++) {
            var filtered = stacks[i].filter((value, index, arr) => {
                return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
            });
            stacks[i] = filtered;
        }
        return stacks;
    }

}