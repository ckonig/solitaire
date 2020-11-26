function Card(props) {

  var cardStyle = {
    borderStyle: 'solid',
    borderColor: 'black',
    width: '80px',
    height: '120px',
    float:'left',
    margin:'10px',
    borderRadius: '5px',
    position:'relative',
  };

  var faceStyle = {
    textAlign: 'center',
    position:'absolute',
    top:'20px',
    width:'80px',
  }

  var iconStyles = {
    tl: {
      position: 'absolute',
      display: 'inline-block',
      left: '5px',
      top: '0px',
    },
    tr: {
      position: 'absolute',
      display: 'inline-block',
      right: '5px',
      top: '0px',
    },
    bl: {
      position: 'absolute',
      display: 'inline-block',
      left: '5px',
      bottom: '0px',
    },
    br: {
      position: 'absolute',
      display: 'inline-block',
      right: '5px',
      bottom: '0px',
    }
  };

  var icons = {
    'herz': '♥',
    'karo': '♦',
    'kreuz': '♣',
    'pik': '♠'
  };

  function getIcon(face) {
    return icons[face]
  };

  function getCardStyle(color) {
    var st = cardStyle;
    st['color'] = color;
    return st;
  }

  return (
    <div style={getCardStyle(props.type.color)}>
      <div style={iconStyles['tl']}> {getIcon(props.type.name)}</div>
      <div style={iconStyles['tr']}> {getIcon(props.type.name)}</div>
      <div style={faceStyle}> <h1>{props.face}</h1></div>
      <div style={iconStyles['bl']}> {getIcon(props.type.name)}</div>
      <div style={iconStyles['br']}> {getIcon(props.type.name)}</div>
    </div>
  );
};

export default Card;