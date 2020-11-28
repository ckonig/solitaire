import { CardRange } from './CardTypes';

export default class Engine {
    constructor(stateholder) {
        this.stateHolder = stateholder;
    }

    tryUncover = (card, cb) => {
        //@todo unhide behavior depends on stack: 
        // is it blocked by being the source of the current hand?
        if (this.stateHolder.state.hand.source && card.props.source == this.stateHolder.state.hand.source) {
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
        if (this.stateHolder.state.currentCard !== null) {
            if (this.stateHolder.state.targetStacks[index].icon == this.stateHolder.state.currentCard.props.type.icon) {
                var currentAccepted = this.stateHolder.state.targetStacks[index].acceptedCards[this.stateHolder.state.targetStacks[index].acceptedCards.length - 1];
                if (currentAccepted == this.stateHolder.state.currentCard.props.face) {
                    this.stateHolder.setState((state, props) => {
                        if (state.targetStacks[index].stack.indexOf(this.stateHolder.state.currentCard) == -1) {
                            this.removeFromAll()
                            state.targetStacks[index].stack.push(this.stateHolder.state.currentCard);
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
        var c = card || this.stateHolder.state.currentCard;
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
        } else if (this.stateHolder.state.currentCard == null) {
            this.removeFromAll(() =>
                this.stateHolder.setState((state, props) => {
                    state.hand.stack = [card]
                    state.hand.source = card.props.source;
                    return { ...state, currentCard: card };
                }), card);
        } else if (this.stateHolder.state.currentCard == card) {
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
        if (this.stateHolder.state.currentCard != null && this.stateHolder.state.currentCard != card) {
            if (this.stateHolder.state.currentCard != null && this.stateHolder.state.hand.source == 'main' || this.stateHolder.state.hand.source == 'play') {
                this.stateHolder.setState((state, props) => {
                    var current = state.currentCard;
                    var top = this.stateHolder.state.playStack[this.stateHolder.state.playStack.length - 1];
                    if (current && !top || top.face !== current.props.face || top.type.icon !== current.props.type.icon) {
                        state.playStack.push(this.stateHolder.state.currentCard.props);
                    }
                    state.hand.stack = []
                    return { ...state, currentCard: null };
                });
            }
        } else if (card && this.stateHolder.state.currentCard == card) {
            this.unselect();
        } else if (card && this.stateHolder.state.currentCard == null) {
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
        } else if (card && !this.tryUncover(card) && this.stateHolder.state.hand.source && card.props.source == this.stateHolder.state.hand.source) {
            // put back onto orignal stack
            this.stateHolder.setState((state, props) => {
                if (this.stateHolder.state.currentCard != null && this.stateHolder.state.stacks[index].stack.indexOf(this.stateHolder.state.currentCard.props) == -1) {
                    state.stacks = this.filterOut(state.stacks, this.stateHolder.state.currentCard)
                    state.stacks[index].stack.push(state.currentCard.props);
                    return { ...state };
                }
            }, () => {
                this.unselect();
            });
        } else if (card && this.stateHolder.state.currentCard != null && this.stateHolder.state.currentCard != card) {
            if (this.validateBoardStackMove(this.stateHolder.state.currentCard, card)) {
                this.stateHolder.setState((state, props) => {
                    if (this.stateHolder.state.currentCard != null && this.stateHolder.state.stacks[index].stack.indexOf(this.stateHolder.state.currentCard.props) == -1) {
                        state.stacks = this.filterOut(state.stacks, this.stateHolder.state.currentCard)
                        state.stacks[index].stack.push(state.currentCard.props);
                        return { ...state };
                    }
                }, () => {
                    this.removeFromPlayStack();
                    this.removeFromMainStack();
                    this.unselect();
                });
            } else {
                this.blinkBoardStack(index);
            }
        } else if (!card && this.stateHolder.state.currentCard && this.stateHolder.state.currentCard.props && this.stateHolder.state.currentCard.props.face == 'K') {
            this.stateHolder.setState((state, props) => {
                if (this.stateHolder.state.currentCard != null && this.stateHolder.state.stacks[index].indexOf(this.stateHolder.state.currentCard.props) == -1) {
                    this.removeFromPlayStack();
                    this.removeFromMainStack();
                    state.stacks = this.filterOut(state.stacks, this.stateHolder.state.currentCard)
                    state.stacks[index].push(this.stateHolder.state.currentCard.props);
                    state.hand.stack = []
                    return { ...state, currentCard: null };
                }
            }, () => {
                // this.removeFromPlayStack();
                // this.removeFromMainStack();
                this.unselect();
            });
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