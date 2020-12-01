import React, { Component } from "react";
import { cardBaseStyle, faceBaseStyle, iconBaseStyles } from "../styles";

export default class Card extends Component {
  //@todo sanitize styles
  render() {
    var cardStyle = {
      ...cardBaseStyle,
      boxShadow: '2px 2px 2px 2px black',
    };

    if (this.props.isSelected) {
      cardStyle['backgroundColor'] = 'lightgray';
      cardStyle['borderColor'] = 'yellow';
    }

    var className = '';
    if (this.props.isHidden) {
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
      st.zIndex = this.props.offsetTop + 2;
      if (this.props.zIndex) {
        st.zIndex = this.props.zIndex;
      }
      if (this.props.blink) {
        st['borderColor'] = 'red';
        st.boxShadow = '2px 2px 2px 2px red';
      }
      return st;
    }
    var content = <div></div>;
    if (!this.props.isHidden) {
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

    //@todo accept `Card` model and pass it to click handler // source as 2nd parameter? how to store in model?
    //source is not property of card, but of CardPlacement ? -> stack of placements, placement contains source and card
    return (
      <div style={getCardStyle(this.props.type.color)} className={className} onClick={(e) => this.props.onClick(this)}>
        { content}
      </div>
    );
  }
};