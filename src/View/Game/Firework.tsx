import React from "react";
import confetti from "canvas-confetti";

const Firework = (props: { intensity: number }) => {
    const canvasRef = React.createRef<HTMLCanvasElement>();
    React.useEffect(() => {
        if (canvasRef && canvasRef.current && props.intensity) {
            const count = 15 * props.intensity;
            const origin = {
                x: 0.5,
                y: 0.33,
            };

            const scalar = window.innerWidth / (1080 / 100) / 100;
            const defaults = {
                ticks: 50,
                origin,
                particleCount: 40,
                startVelocity: scalar * 20,
                decay: 0.8,
                spread: 360,
                scalar: scalar,
            };
            const localConfetti = confetti.create(canvasRef.current, { resize: true });

            const fire = (particleRatio: number, opts: confetti.Options) => {
                localConfetti(
                    Object.assign({}, defaults, opts, {
                        particleCount: Math.floor(count * particleRatio),
                    })
                );
            };

            fire(0.25, {
                startVelocity: scalar * 55,
            });
            fire(0.2, {
                decay: 1.2,
            });
            fire(0.35, {
                decay: 0.91,
                scalar: scalar - 0.2,
            });
            fire(0.1, {
                startVelocity: scalar * 25,
                decay: 0.92,
                scalar: scalar + 0.2,
            });
            fire(0.1, {});
            fire(0.1, {
                startVelocity: scalar * 45,
            });
        }
    }, [canvasRef, props.intensity]);

    return <canvas ref={canvasRef}></canvas>;
};

export default Firework;
