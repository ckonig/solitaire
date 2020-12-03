import Card from './Card';
import Hand2 from './Hand2';
import TouchAwareComponent from './TouchAwareComponent';
import { targetStackStyle } from '../styles';

export default class TableauStack extends TouchAwareComponent {
    render() {
        var styles = {
            ...targetStackStyle
        };

        var localStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
        };

        var localOuterStyle = {
            position: 'relative',
            height: '30vw',

        };

        var localCardStyle = { ...styles.cardStyle };

        if (this.props.model.blinkFor > 0) {
            localCardStyle.borderColor = 'red';
        }

        var offset = 0;

        var getOffset = (index) => {
            var i = 0;
            while (i <= index) {
                if (this.props.model.stack[i] && !this.props.model.stack[i].isHidden) {
                    offset = i * 12 + (index - i) * 24
                    return offset;
                }
                i++;
            }
            offset = index * 12;
            return offset;
        }

        var shouldShowHand = () => {
            return this.isTouch && this.props.hand.isHoldingCard() && this.props.hand.source == 'tableau-' + this.props.stackIndex;
        }

        var getLast = () => {
            var ret = this.props.model.stack[this.props.model.stack.length - 1]
            ret && (ret.isHidden = ret.isHidden);
            return ret;
        }

        return (
            <div style={localOuterStyle}>
                <div style={localCardStyle} onClick={() => this.props.onClick(null, "tableau-" + this.props.stackIndex)}>&nbsp;</div>
                {this.props.model.stack.map((card, index) => (
                    <div style={localStyle}>
                        <Card
                            type={card.type}
                            face={card.face}
                            blink={this.props.model.blinkFor}
                            offsetTop={getOffset(index)}
                            source={card.source}
                            isHidden={card.isHidden}
                            canUncover={index == this.props.model.stack.length - 1}
                            onClick={(c) => this.props.onClick(c, "tableau-" + this.props.stackIndex)}
                        />
                    </div>
                ))}
                {shouldShowHand() && (<Hand2
                    offset={getOffset(this.props.model.stack.length)}
                    stack={this.props.hand.stack}
                    onClick={(c) => this.props.onClick(getLast(), "tableau-" + this.props.stackIndex)} />)}
            </div>
        );
    }
}
