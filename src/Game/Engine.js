import {CardRange} from '../Deck/CardRange';

export default class Engine {
    constructor(stateholder) {
        this.stateHolder = stateholder;
    }

    state() {
        return this.stateHolder.state;
    }

    tryUncover = (card, cb) => {
        if (this.state().hand.source && card.props.source == this.state().hand.source) {
            cb && cb();
            return false;
        }
        if (card.props.isHidden && card.props.canUncover) {
            this.stateHolder.setState((state, props) => {
                state.playStack = this.unhideInStack(state.playStack, card);
                state.stack = this.unhideInStack(state.stack, card);
                for (var j = 0; j < state.stacks.length; j++) {
                    state.stacks[j].stack = this.unhideInStack(state.stacks[j].stack, card);
                }
                return { ...state };
            }, cb);
            return true;
        }
        cb && cb();
        return false;
    }

    unhideInStack(stack, card) {
        for (var i = 0; i < stack.length; i++) {
            if (stack[i].face == card.props.face && stack[i].type.icon == card.props.type.icon) {
                stack[i].hidden = false;
            }
        }
        return stack;
    }

    onTargetStackClick = (index) => {
        if (this.state().currentCard !== null) {
            if (this.state().targetStacks[index].icon == this.state().currentCard.props.type.icon) {
                var currentAccepted = this.state().targetStacks[index].acceptedCards[this.state().targetStacks[index].acceptedCards.length - 1];
                if (currentAccepted == this.state().currentCard.props.face) {
                    this.stateHolder.setState((state, props) => {
                        if (state.targetStacks[index].stack.indexOf(this.state().currentCard) == -1) {
                            this.removeFromAll()
                            state.targetStacks[index].stack.push(this.state().currentCard);
                            state.targetStacks[index].acceptedCards.pop();
                        }
                        return { ...state, currentCard: null, hand: [] };
                    });
                } else {
                    this.blinkTargetStack(index);
                }
            } else {
                this.blinkTargetStack(index);
            }
        }
    }

    blinkTargetStack = (index) => {
        this.stateHolder.setState((state, props) => {
            console.debug('turn on blinking');
            state.targetStacks[index].blinkFor = 10;
            return { ...state };
        }, () =>
            setTimeout(() => {
                console.debug('turn off blinking');
                this.stateHolder.setState((state, props) => {
                    state.targetStacks[index].blinkFor = 0;
                    return { ...state };
                });
            }, 100));
    }

    removeFromAll(cb, card) {
        var c = card || this.state().currentCard;
        this.removeFromMainStack(() => {
            this.removeFromPlayStack(() => {
                this.removeFromBoardStacks(cb, c)
            }, c)
        }, c);
    }

    removeFromPlayStack = (callback, card) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                var filtered = state.playStack.filter((value, index, arr) => {
                    return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
                });

                state.playStack = filtered;
                return { ...state };
            }, () => {
                callback && callback()
            });
        else
            callback && callback()
    }

    removeFromBoardStacks = (callback, card) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                state.stacks = this.filterOut(state.stacks, card);
                return { ...state };
            }, () => {
                callback && callback()
            });
        else
            callback && callback()
    }

    removeFromMainStack = (callback, card) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                var filtered = state.stack.filter((value, index, arr) => {
                    return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
                });
                state.stack = filtered;
                return { ...state };
            }, () => {
                callback && callback()
            });
        else
            callback && callback()
    }

    unselect = () => {
        this.stateHolder.setState((state, props) => {
            return { ...state, currentCard: null, hand: [] };
        });
    }

    requestReset = () => {
        this.stateHolder.setState((state, props) => {
            state.stack = [...state.playStack].reverse().map(element => {
                return { ...element, hidden: true }
            })
            state.playStack = [];
            return { ...state };
        });
    }

    setCurrentCard = (card) => {
        if (card && this.tryUncover(card)) {
            console.debug('success uncover')
        } else if (this.state().currentCard == null) {
            this.removeFromAll(() =>
                this.stateHolder.setState((state, props) => {
                    state.hand.stack = [card]
                    state.hand.source = card.props.source;
                    return { ...state, currentCard: card };
                }), card);
        } else if (this.state().currentCard == card) {
            this.stateHolder.setState((state, props) => {
                state.hand.stack = []
                state.hand.source = null;
                return { ...state, currentCard: null };
            });
        }
    }

    clickMainStack = (card) => {
        this.tryUncover(card, () => this.setCurrentCard(card));
    }

    addToPlayStack = (card) => {
        if (this.state().currentCard != null && this.state().currentCard != card) {
            if (this.state().currentCard != null && this.state().hand.source == 'main' || this.state().hand.source == 'play') {
                this.stateHolder.setState((state, props) => {
                    var current = state.currentCard;
                    var top = this.state().playStack[this.state().playStack.length - 1];
                    if (current && !top || top.face !== current.props.face || top.type.icon !== current.props.type.icon) {
                        state.playStack.push(this.state().currentCard.props);
                    }
                    state.hand.stack = []
                    return { ...state, currentCard: null };
                });
            }
        } else if (card && this.state().currentCard == card) {
            this.unselect();
        } else if (card && this.state().currentCard == null) {
            this.setCurrentCard(card);
        }
    }

    validateBoardStackMove = (current, top) => {
        var range = [...CardRange];
        var currentIndex = range.indexOf(current.props.face);
        var topIndex = range.indexOf(top.props.face);
        return (currentIndex + 1) == topIndex && (current.props.type.color != top.props.type.color);
    }

    onBoardStackClick = (card, index) => {
        if (card && this.tryUncover(card)) {
            // can't put card onto hidden card
        } else if (card && !this.tryUncover(card) && this.state().hand.source && card.props.source == this.state().hand.source) {
            // put back onto orignal stack
            this.stateHolder.setState((state, props) => {
                if (this.state().currentCard != null && this.state().stacks[index].stack.indexOf(this.state().currentCard.props) == -1) {
                    state.stacks = this.filterOut(state.stacks, this.state().currentCard)
                    state.stacks[index].stack.push(state.currentCard.props);
                    return { ...state };
                }
            }, this.unselect);
        } else if (card && this.state().currentCard != null && this.state().currentCard != card) {
            if (this.validateBoardStackMove(this.state().currentCard, card)) {
                this.stateHolder.setState((state, props) => {
                    if (this.state().currentCard != null && this.state().stacks[index].stack.indexOf(this.state().currentCard.props) == -1) {
                        state.stacks = this.filterOut(state.stacks, this.state().currentCard)
                        state.stacks[index].stack.push(state.currentCard.props);
                        return { ...state };
                    }
                }, this.unselect);
            } else {
                this.blinkBoardStack(index);
            }
        } else if (!card && this.state().currentCard && this.state().currentCard.props && this.state().currentCard.props.face == 'K') {
            this.stateHolder.setState((state, props) => {
                if (this.state().currentCard != null && this.state().stacks[index].indexOf(this.state().currentCard.props) == -1) {
                    this.removeFromPlayStack();
                    this.removeFromMainStack();
                    state.stacks = this.filterOut(state.stacks, this.state().currentCard)
                    state.stacks[index].push(this.state().currentCard.props);
                    state.hand.stack = []
                    return { ...state, currentCard: null };
                }
            }, this.unselect);
        }

        this.setCurrentCard(card);
    }

    blinkBoardStack = (index) => {
        this.stateHolder.setState((state, props) => {
            state.stacks[index].blinkFor = 10;
            return { ...state };
        }, () =>
            setTimeout(() => {
                this.stateHolder.setState((state, props) => {
                    state.stacks[index].blinkFor = 0;
                    return { ...state };
                });
            }, 100));
    }

    filterOut(stacks, card) {
        for (var i = 0; i < stacks.length; i++) {
            var filtered = stacks[i].stack.filter((value, index, arr) => {
                return value.face !== card.props.face || value.type.icon !== card.props.type.icon;
            });
            stacks[i].stack = filtered;
        }

        return stacks;
    }
}