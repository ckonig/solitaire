import { Component } from "react";

class Card extends Component {

  render() {

    var cardStyle = {
      borderStyle: 'solid',
      borderColor: 'black',
      width: '80px',
      height: '120px',
      float: 'left',
      margin: '10px',
      borderRadius: '5px',
      position: 'relative',
      backgroundColor: 'white',
    };

    if (this.props.isSelected) {
      cardStyle['backgroundColor'] = 'lightgray';
      cardStyle['borderColor'] = 'yellow';
    }

    var faceStyle = {
      textAlign: 'center',
      position: 'absolute',
      top: '15px',
      width: '80px',
      fontSize: '60px',
      fontWeight: 'bold',
    }

    var baseIconStyle = {
      position: 'absolute',
      display: 'inline-block',
      fontSize: '20px',
    }

    var iconStyles = {
      tl: {
        ...baseIconStyle,
        left: '5px',
        top: '0px',
      },
      tr: {
        ...baseIconStyle,
        right: '5px',
        top: '0px',
      },
      bl: {
        ...baseIconStyle,
        left: '5px',
        bottom: '0px',
      },
      br: {
        ...baseIconStyle,
        right: '5px',
        bottom: '0px',
      }
    };
    var iconLabelStyles = {
      tl: { ...iconStyles.tl },
      br: { ...iconStyles.br },
    };

    iconLabelStyles['tl']['left'] = '20px';
    iconLabelStyles['br']['right'] = '20px';

    function getCardStyle(color) {
      var st = cardStyle;
      st['color'] = color;
      return st;
    }

    return (
      <div style={getCardStyle(this.props.type.color)} onClick={() => this.props.clickCard(this.props)}>
        <div>
          <div style={iconStyles['tl']}> {this.props.type.icon}</div>
          <div style={iconLabelStyles['tl']}> {this.props.face}</div>
          <div style={iconStyles['tr']}> {this.props.type.icon}</div>
          <div style={faceStyle}> <a>{this.props.face}</a></div>
          <div style={iconStyles['bl']}> {this.props.type.icon}</div>
          <div style={iconLabelStyles['br']}> {this.props.face}</div>
          <div style={iconStyles['br']}> {this.props.type.icon}</div>
        </div>
      </div>
    );
  }
};

export default Card;