import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { random } from "maath";

const positions = random.inSphere(new Float32Array(15000), { radius: 20 });

export default function Snow() {
    useFrame((_, delta) => {
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= delta * 0.8;
            if (positions[i] < -20) positions[i] = 20;
        }
    });

    return (
        <Points positions={positions as Float32Array}>
            <PointMaterial
                transparent
                size={0.05}
                sizeAttenuation={true}
                color="white"
                opacity={0.6}
            />
        </Points>
    );
}
