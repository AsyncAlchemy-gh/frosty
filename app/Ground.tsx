import React from 'react'
import Displaced from './Displaced'
import { useControls } from 'leva';

const Ground = () => {

    const { noiseScale, displacement } = useControls("noise", {
        noiseScale: {
            value: 2,
            min: 0,
            max: 2,
            step: 0.01,
        },
        displacement: {
            value: 0.05,
            min: 0,
            max: 1,
            step: 0.01,
        },
    });

    return (
        <Displaced key={`${noiseScale}-${displacement}`} isPlane={true} noiseScale={1.42} displacement={0.24}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[40, 40, 256, 256]} />
                <meshBasicMaterial />
            </mesh>
        </Displaced>
    )
}

export default Ground