import { Component } from "react";
import { cardBaseStyle, faceBaseStyle, iconBaseStyles } from "./styles";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: props.isHidden
    };
  }

  //@todo move to engine

  onClick() {
    //@todo unhide behavior depends on stack: is it blocked by being the source of the current hand?
    if (this.state.isHidden && this.props.canUncover) {
      this.setState((state, props) => {
        console.debug("card unhide onclick")
        return { ...state, isHidden: false };
      });
    } else if (!this.state.isHidden || this.props.canUncover) {
      this.props.clickCard(this);
      console.debug("card delegated onclick")
    } else {
      console.debug("card catchall onclick")
    }
  }

  render() {

    var cardStyle = {
      ...cardBaseStyle
    };

    if (this.props.isSelected) {
      cardStyle['backgroundColor'] = 'lightgray';
      cardStyle['borderColor'] = 'yellow';
    }
    var className = '';
    if (this.state.isHidden) {
      className = 'karo';
    }

    if (this.props.offset) {
      cardStyle['top'] = this.props.offset;
      cardStyle['left'] = this.props.offset;
    }

    if (this.props.offsetTop) {
      cardStyle['top'] = this.props.offsetTop;
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
      st.zIndex = this.props.offsetTop+2;
      if (this.props.blink) {
        st['borderColor'] = 'red';
      }
      return st;
    }
    var content = <div></div>;
    if (!this.state.isHidden) {
      content = <div>
        <div style={iconBaseStyles['tl']}> {this.props.type.icon}</div>
        <div style={iconLabelStyles['tl']}> {this.props.face}</div>
        <div style={iconBaseStyles['tr']}> {this.props.type.icon}</div>
        <div style={faceBaseStyle}> <a>{this.props.face}</a></div>
        <div style={iconBaseStyles['bl']}> {this.props.type.icon}</div>
        <div style={iconLabelStyles['br']}> {this.props.face}</div>
        <div style={iconBaseStyles['br']}> {this.props.type.icon}</div>
      </div>;
    }

    return (
      <div style={getCardStyle(this.props.type.color)} className={className} onClick={() => this.onClick()}>
        { content}
      </div>
    );
  }
};

export default Card;