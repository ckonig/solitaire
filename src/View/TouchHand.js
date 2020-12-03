import Card from './Card';
import TouchAwareComponent from './TouchAwareComponent';

export default class TouchHand extends TouchAwareComponent {
    render() {
        if (!this.isTouch || !this.props.hand || this.props.parent !== this.props.hand.source) {
            return null;
        }
        return (
            <div>
                {this.props.hand && this.props.hand.stack && this.props.hand.stack.map((card, index) => (
                    <div className="stack-base" key={"h2"+index}>
                        <Card
                            offsetTop={this.props.offset + (index * 20)}
                            zIndex={1000 + (index * 20)}
                            type={card.type}
                            face={card.face}
                            isSelected={true}
                            source={card.source}
                            onClick={(c) => this.props.onClick(c)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}