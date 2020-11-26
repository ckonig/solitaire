import { Component } from "react";
import { cardBaseStyle, faceBaseStyle, iconBaseStyles } from "./styles";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: props.owner,
    };
  }

  setOwner = (owner) => {
    if (this.state.owner != null) {
      this.state.owner.disown(this);
    } else {
      console.log('no owner to disown');
    }
    this.setState((state, props) => {
      return { ...state, owner: owner };
    });
  }

  render() {

    var cardStyle = {
      ...cardBaseStyle
    };

    if (this.props.isSelected) {
      cardStyle['backgroundColor'] = 'lightgray';
      cardStyle['borderColor'] = 'yellow';
    }

    if (this.props.offset) {
      cardStyle['top'] = this.props.offset;
      cardStyle['left'] = this.props.offset;
    }

    var iconLabelStyles = {
      tl: { ...iconBaseStyles.tl },
      br: { ...iconBaseStyles.br },
    };

    iconLabelStyles['tl']['left'] = '20px';
    iconLabelStyles['br']['right'] = '20px';

    const getCardStyle = (color) => {
      var st = { ...cardStyle };
      st['color'] = color;
      if (this.props.blink) {
        st['borderColor'] = 'red';
        console.log('blinking card')
      }
      return st;
    }

    return (
      <div style={getCardStyle(this.props.type.color)} onClick={() => this.props.clickCard(this)}>
        <div>
          <div style={iconBaseStyles['tl']}> {this.props.type.icon}</div>
          <div style={iconLabelStyles['tl']}> {this.props.face}</div>
          <div style={iconBaseStyles['tr']}> {this.props.type.icon}</div>
          <div style={faceBaseStyle}> <a>{this.props.face}</a></div>
          <div style={iconBaseStyles['bl']}> {this.props.type.icon}</div>
          <div style={iconLabelStyles['br']}> {this.props.face}</div>
          <div style={iconBaseStyles['br']}> {this.props.type.icon}</div>
        </div>
      </div>
    );
  }
};

export default Card;