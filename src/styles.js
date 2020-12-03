export const faceBaseStyle = {
    textAlign: 'center',
    position: 'absolute',
    left:'0vw',
    top: '2vw',
    width: '9.45vw',
    fontSize: '6vw',
    fontWeight: 'bold',
}

export const iconBaseStyle = {
    position: 'absolute',
    display: 'inline-block',
    fontSize: '2vw',
}

export const iconBaseStyles = {
    tl: {
        ...iconBaseStyle,
        left:  '0.5vw',
        top: '0vw',
    },
    tr: {
        ...iconBaseStyle,
        right:  '0.5vw',
        top: '0vw',
    },
    bl: {
        ...iconBaseStyle,
        left:  '0.5vw',
        bottom: '0vw',
    },
    br: {
        ...iconBaseStyle,
        right:  '0.5vw',
        bottom: '0vw',
    }
};

var faceStyle = {
    textAlign: 'center',
    position: 'absolute',
    top: '6.5vw',
    width: '6.45vw',
};
export const targetStackStyle = {
    cardStyle: {
        borderStyle: 'dashed',
        borderColor: 'gray',
        width: '9.45vw',
        height: '13.2vw',
        float: 'left',
       // margin: '0.1vw',
        borderRadius: '0.3vw',
        position: 'relative',
    },

    faceStyle: {
        ...faceStyle
    },
    faceStyleRed: {
        ...faceStyle,
        color: 'red'
    },

}

export const styles = {
    solitaire: {
        table: {
            backgroundColor: 'darkgreen',
            zIndex: -1,
        },
        stackbox: {
            width: '9.45vw',
            height: '13.2vw',
            float: 'left'
        },
    }
}