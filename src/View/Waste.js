import Card from './Card';
import Hand2 from './Hand2';
import TouchAwareComponent from './TouchAwareComponent';
import { targetStackStyle } from '../styles';

export default class Waste extends TouchAwareComponent {

    render() {
        var shouldShowHand = () => {
            return this.isTouch && this.props.hand.isHoldingCard() && this.props.hand.source == 'waste';
        }

        var getOffset = () => 0;

        //@todo cleanup css
        var localStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
        };
        var localOuterStyle = {
            position: 'relative',
        };
        var localBase = { ...targetStackStyle.cardStyle }
        if (this.props.model.blinkFor > 0) {
            localBase.borderColor = 'red';
        }

        return (
            <div style={localOuterStyle}>
                <div style={localBase} onClick={() => this.props.onClick()}>&nbsp;</div>
                {this.props.model.stack.map((card, index) => (
                    <div style={localStyle}>
                        <Card type={card.type}
                            face={card.face}
                            blink={this.props.model.blinkFor}
                            source="waste"
                            onClick={(c) => this.props.onClick(c)}
                        />
                    </div>

                ))}
                {shouldShowHand() && (<Hand2 offset={getOffset(this.props.model.stack.length)}
                    stack={this.props.hand.stack} onClick={(c) => this.props.onClick(c, "waste")} />)}
            </div>
        );
    }
}