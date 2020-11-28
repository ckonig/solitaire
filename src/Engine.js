import { getDeck, getStacks, CardRange } from './CardTypes';

export default class Engine {
    constructor(stateholder) {
        this.stateHolder = stateholder;
    }

    tryUncover = (card, cb) => {
        console.log('try uncover', card)
        //@todo unhide behavior depends on stack: is it blocked by being the source of the current hand?
        if (card.props.isHidden && card.props.canUncover) {
            this.stateHolder.setState((state, props) => {
                state.playStack = this.unhideInStack(state.playStack, card);
                state.stack = this.unhideInStack(state.stack, card);
                for (var j = 0; j < state.stacks.length; j++) {
                    state.stacks[j].stack = this.unhideInStack(state.stacks[j], card);
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
                console.log('UNHIDDEN', stack[i])
            }
        }
        return stack;
    }

    onTargetStackClick = (index) => {
        console.log(index, this.stateHolder.state.targetStacks);
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
                    //@todo blink via state machine model(?)
                    //this.blinkRed();
                }
            } else {
                //this.blinkRed();
            }
        }
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
        else
            callback && callback()
    }

    removeFromBoardStacks = (callback, card) => {
        if (card)
            this.stateHolder.setState((state, props) => {
                console.debug('removeFromBoardStacks')
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
                console.debug('removeFromMainStack')
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
            console.debug('unselect')
            return { ...state, currentCard: null, hand: [] };
        });
    }

    requestReset = () => {
        this.stateHolder.setState((state, props) => {
            console.debug('requestReset')
            console.debug('  before transfer', this.stateHolder.state.stack.length, this.stateHolder.state.playStack.length);
            state.stack = [...state.playStack].reverse().map(element => {
               return { ...element, hidden: true}
            })
            state.playStack = [];
            console.debug('after transfer')
            console.debug(state.stack.length, state.playStack.length);
            return { ...state };
        });
    }

    setCurrentCard = (card) => {
        console.debug('setCurrentCard()')
        if (card && this.tryUncover(card)) {
            console.log('success uncover')
        } else if (this.stateHolder.state.currentCard == null) {
            this.removeFromAll(() =>
                this.stateHolder.setState((state, props) => {
                    console.debug('setCurrentCard set')
                    state.hand.stack = [card]
                    state.hand.source = card.props.source;
                    return { ...state, currentCard: card };
                }), card);
        } else if (this.stateHolder.state.currentCard == card) {
            this.stateHolder.setState((state, props) => {
                console.debug('setCurrentCard unset')
                state.hand.stack = []
                state.hand.source = null;
                return { ...state, currentCard: null };
            });
        } else {
            console.debug('setCurrentCard catchall')
            console.debug(this.stateHolder.state.currentCard)
            console.debug(card)
        }
    }

    clickMainStack = (card) => {
        this.tryUncover(card, () => this.setCurrentCard(card));
    }

    addToPlayStack = (card) => {
        console.debug('addToPlayStack')
        if (this.stateHolder.state.currentCard != null && this.stateHolder.state.currentCard != card) {
            if (this.stateHolder.state.currentCard != null && this.stateHolder.state.hand.source == 'main' || this.stateHolder.state.hand.source == 'play'
                // && this.stateHolder.state.stack[this.stateHolder.state.stack.length - 1].face == this.stateHolder.state.currentCard.props.face
                // && this.stateHolder.state.stack[this.stateHolder.state.stack.length - 1].type.icon == this.stateHolder.state.currentCard.props.type.icon
            ) {
                console.debug("  #1");
                console.debug(this.stateHolder.state.currentCard)
                console.debug('   way before', this.stateHolder.state.playStack.length);
                this.stateHolder.setState((state, props) => {
                    console.debug('   before', state.playStack.length);
                    var current = state.currentCard;
                    var top = this.stateHolder.state.playStack[this.stateHolder.state.playStack.length - 1];
                    if (current && !top || top.face !== current.props.face || top.type.icon !== current.props.type.icon) {
                        state.playStack.push(this.stateHolder.state.currentCard.props);
                    }
                    console.debug('   after', state.playStack.length);
                    state.hand.stack = []
                    return { ...state, currentCard: null };
                }, () => {
                    console.debug('   way after', this.stateHolder.state.playStack.length);
                });
            } else {
                console.debug('#44')
                console.debug(this.stateHolder.state.currentCard)
            }
        } else if (card && this.stateHolder.state.currentCard == card) {
            console.debug("  #2");
            this.unselect();
        } else if (card && this.stateHolder.state.currentCard == null) {
            console.debug("  #3");
            this.setCurrentCard(card);
        } else {
            console.debug('%4')
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
        if (card && this.tryUncover(card)) {
            //
        } else if (card && this.stateHolder.state.currentCard != null && this.stateHolder.state.currentCard != card) {
            if (this.validateBoardStackMove(this.stateHolder.state.currentCard, card)) {
                this.stateHolder.setState((state, props) => {
                    if (this.stateHolder.state.currentCard != null && this.stateHolder.state.stacks[index].indexOf(this.stateHolder.state.currentCard.props) == -1) {
                        state.stacks = this.filterOut(state.stacks, this.stateHolder.state.currentCard)
                        state.stacks[index].push(state.currentCard.props);
                        return { ...state };
                    }
                }, () => {
                    this.removeFromPlayStack();
                    this.removeFromMainStack();
                    this.unselect();
                });
            } else {
                // this.blinkRed(); @todo fix
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
                this.removeFromPlayStack();
                this.removeFromMainStack();
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