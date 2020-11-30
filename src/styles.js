export const cardBaseStyle = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'black',
    width: '80px',
    height: '120px',
    float: 'left',
    margin: '10px',
    borderRadius: '5px',
    position: 'relative',
    backgroundColor: 'white',
};

export const faceBaseStyle = {
    textAlign: 'center',
    position: 'absolute',
    top: '15px',
    width: '80px',
    fontSize: '60px',
    fontWeight: 'bold',
}

export const iconBaseStyle = {
    position: 'absolute',
    display: 'inline-block',
    fontSize: '20px',
}

export const iconBaseStyles = {
    tl: {
        ...iconBaseStyle,
        left: '5px',
        top: '0px',
    },
    tr: {
        ...iconBaseStyle,
        right: '5px',
        top: '0px',
    },
    bl: {
        ...iconBaseStyle,
        left: '5px',
        bottom: '0px',
    },
    br: {
        ...iconBaseStyle,
        right: '5px',
        bottom: '0px',
    }
};

var faceStyle = {
    textAlign: 'center',
    position: 'absolute',
    top: '20px',
    width: '80px',
};
export const targetStackStyle = {
    cardStyle: {
        borderStyle: 'dashed',
        borderColor: 'gray',
        width: '80px',
        height: '120px',
        float: 'left',
        margin: '10px',
        borderRadius: '5px',
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
var baseStyles = {
    baseContainer: {
        position: 'absolute',
        left: '0px',
        width: '800px'
    },
}
export const styles = {
    solitaire: {

        upperContainer: { ...baseStyles.baseContainer, top: '0px', height: '200px' },
        middleContainer: { ...baseStyles.baseContainer, top: '200px', height: '400px' },
        lowerContainer: { ...baseStyles.baseContainer, top: '600px', },
        table: {
            backgroundColor: 'darkgreen',
            height: '600px',
            zIndex: -1,
        },
        stackbox: { width: '110px', float: 'left' },
    }
}