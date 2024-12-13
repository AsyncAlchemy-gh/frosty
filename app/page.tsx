'use client'
import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Ground from './Ground'
import Snow from './Snow'

const Page = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <fogExp2 attach="fog" color="#0a0a0a" density={0.08} />
        <ambientLight intensity={0.2} />
        <Ground />
        <Stars />
        <Snow />
        <OrbitControls />
      </Canvas></div>
  )
}

export default Page