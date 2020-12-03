export default function Card(props) {
  var className = 'card suit-' + props.type.icon;

  if (props.isSelected) {
    className += ' card-selected'
  }

  if (props.blink) {
    className += ' card-blink'
  }

  var style = {};
  if (props.offsetTop) {
    style['top'] = (props.offsetTop / 10) + "vw";
  }
  style.zIndex = props.offsetTop + 2;
  if (props.zIndex) {
    style.zIndex = props.zIndex;
  }

  return (
    <div style={style} className={className} onClick={(e) => props.onClick({ ...props })}>
      { props.isHidden
        ? (
          <div className="card-back">&nbsp;</div>
        )
        : (
          <div className="card-grid-container" style={{ height: '100%', width: '100%' }}>
            <div className="tlicon">
              <div className="alignt-center">{props.type.icon}</div>
            </div>
            <div className="tlface">
              <div className="align-left">{props.face}</div>
            </div>
            <div className="tspacer"></div>
            <div className="tricon">
              <div className="alignt-center">{props.type.icon}</div>
            </div>
            <div className="mainface" >
              <div className="alignt-center">{props.face}</div>
            </div>
            <div className="blicon">
              <div className="alignt-center">{props.type.icon}</div>
            </div>
            <div className="bspacer"></div>
            <div className="brface">
              <div className="align-right">{props.face}</div>
            </div>
            <div className="bricon">
              <div className="alignt-center">{props.type.icon}</div>
            </div>
          </div>
        )
      }
    </div>
  );
};
