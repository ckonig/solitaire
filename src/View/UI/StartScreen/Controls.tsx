import GamePad from "../../Game/GamePad";
import React from "react";

//this is what Chrome returns on navigator.getGamepads()
// type GamepadList = {
//     0: Gamepad;
//     1: Gamepad;
//     2: Gamepad;
//     3: Gamepad;
//     length: number;
// };
//firefox and edge have different formats
const Controls = (props: { player: number }) => {
    const [pads, setPads] = React.useState([
        {
            found: false,
            buttonPressed: false,
        },
        {
            found: false,
            buttonPressed: false,
        },
    ]);
    const connect = (i: number) => {
        pads[i].found = true;
        setPads({ ...pads });
    };
    const press = (i: number) => {
        pads[i].found = true;
        pads[i].buttonPressed = true;
        setPads({ ...pads });
        console.log(pads);
    };
    const display = (pad: any) => (
        <div>
            <div>pressed: {pad.buttonPressed}</div>
            <div>connected: {pad.found ? "Y" : "N"}</div>
        </div>
    );

    return (
        <div className="controls startdetails">
            <div className="title">Controls</div>
            <div className="content center">
                <div>
                    <div className="title">Player {props.player}</div>
                    {display(pads[0])}
                    <div>
                        <GamePad
                            gamepadIndex={0}
                            onConnect={() => connect(0)}
                            onUp={() => press(0)}
                            onDown={() => press(0)}
                            onRight={() => press(0)}
                            onLeft={() => press(0)}
                            onAction={() => press(0)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
