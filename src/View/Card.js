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


    if (this.props.offset) {
      cardStyle['top'] = this.props.offset;
      cardStyle['left'] = this.props.offset;
    }

    if (this.props.offsetTop) {
      cardStyle['top'] = (this.props.offsetTop / 10) + "vw";
    }

    var iconLabelStyles = {
      tl: { ...iconBaseStyles.tl },
      br: { ...iconBaseStyles.br },
    };

    iconLabelStyles['tl']['left'] = '2vw';
    iconLabelStyles['br']['right'] = '2vw';

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
      content = <div className="card-grid-container" style={{ height: '100%', width: '100%' }}>
        <div className="tlicon"><div className="mcontent"> {this.props.type.icon}</div></div>
        <div className="tlface"><div className="lcontent"> {this.props.face}</div></div>
        <div className="tspacer"></div>
        <div className="tricon"><div className="mcontent"> {this.props.type.icon}</div></div>
        <div className="mainface" > <div className="mcontent">{this.props.face}</div></div>
        <div className="blicon"><div className="mcontent"> {this.props.type.icon}</div></div>
        <div className="bspacer"></div>
        <div className="brface"> <div className="rcontent">{this.props.face}</div></div>
        <div className="bricon"> <div className="mcontent">{this.props.type.icon}</div></div>
      </div>;
    } else {
      content = <div className="karo" style={{
        margin: '5%',
        bordeRradius: '5px',
        height: '92%',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
      }}>&nbsp;</div>;
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
