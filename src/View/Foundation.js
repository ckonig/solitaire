import Card from './Card';
import Hand2 from './Hand2';
import TouchAwareComponent from './TouchAwareComponent';
import { targetStackStyle } from '../styles';

export default class Foundation extends TouchAwareComponent {
    render() {
        var styles = {
            ...targetStackStyle
        };

        var localStyle = {
            position: 'absolute',
            left: '0px',
            top: '0px',
        };

        var localFaceStyle = {
            fontSize: '6vw',
        };
        localFaceStyle.color = this.props.model.color;

        var localOuterStyle = {
            position: 'relative',
        };

        var localCardStyle = { ...styles.cardStyle };

        if (this.props.model.blinkFor > 0) {
            localCardStyle.borderColor = 'red';
        }

        var shouldShowHand = () => {
            return this.isTouch && this.props.hand.isHoldingCard() && this.props.hand.source == 'foundation-' + this.props.index;
        }

        var getOffset = () => 0;

        return (
            <div style={localOuterStyle}>
                <div style={localCardStyle} onClick={() => this.props.onClick()}>
                    <div className="mcontent" style={localFaceStyle}>
                        {this.props.model.icon}
                    </div>
                </div>
                {this.props.model.stack.map(card => (
                    <div style={localStyle}>
                        <Card
                            blink={this.props.model.blinkFor}
                            type={card.type}
                            source={card.source}
                            face={card.face}
                            onClick={(c) => this.props.onClick(c)} />
                    </div>))}
                {shouldShowHand() && (<Hand2
                    offset={getOffset(this.props.model.stack.length)}
                    stack={this.props.hand.stack}
                    onClick={(c) => this.props.onClick(this.props.model.stack[this.props.model.stack.length - 1])} />)}
            </div>
        );
    }
}
