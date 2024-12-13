import React, { cloneElement, useLayoutEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { BufferGeometry, Mesh, Vector3 } from "three";

type DisplacedProps = {
    noiseScale?: number;
    displacement?: number;
    isPlane?: boolean;
    children: React.ReactElement;
};

const Displaced = ({
    noiseScale = 2,
    displacement = 0.05,
    isPlane = false,
    children,
}: DisplacedProps) => {
    const meshRef = useRef<Mesh>(null!);
    const noise3D = useMemo(() => createNoise3D(), []);

    useLayoutEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const geometry = mesh.geometry as BufferGeometry;
        const positionAttr = geometry.attributes.position;
        const normalAttr = geometry.attributes.normal;
        if (!positionAttr || !normalAttr) return;

        const positions = positionAttr.array as Float32Array;
        const normals = normalAttr.array as Float32Array;

        // Apply noise-based displacement along normals
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            const noisePos = isPlane
                ? new Vector3(x, y, 0)
                : new Vector3(x, y, z).normalize();

            // Multiple noise layers with different frequencies and amplitudes
            const noise1 = noise3D(
                noisePos.x * noiseScale * 1.0,
                noisePos.y * noiseScale * 1.0,
                noisePos.z * noiseScale * 1.0
            );
            const noise2 =
                noise3D(
                    noisePos.x * noiseScale * 2.5,
                    noisePos.y * noiseScale * 2.5,
                    noisePos.z * noiseScale * 2.5
                ) * 0.5;
            const noise3 =
                noise3D(
                    noisePos.x * noiseScale * 5.0,
                    noisePos.y * noiseScale * 5.0,
                    noisePos.z * noiseScale * 5.0
                ) * 0.25;
            const noise4 =
                noise3D(
                    noisePos.x * noiseScale * 10.0,
                    noisePos.y * noiseScale * 10.0,
                    noisePos.z * noiseScale * 10.0
                ) * 0.125;

            // Combine noise layers
            const totalNoise =
                (noise1 * 0.5 + noise2 * 0.25 + noise3 * 0.15 + noise4 * 0.1) *
                displacement;

            // Displace vertices along their normals
            positions[i] += normals[i] * totalNoise;
            positions[i + 1] += normals[i + 1] * totalNoise;
            positions[i + 2] += normals[i + 2] * totalNoise;
        }

        positionAttr.needsUpdate = true;
        geometry.computeVertexNormals();
    }, [noiseScale, displacement, noise3D, isPlane]);

    return cloneElement(children, { ref: meshRef });
};

export default Displaced;