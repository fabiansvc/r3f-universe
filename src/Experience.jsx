import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Earth from './world/Earth'
import Moon from './world/Moon'
import { MathUtils } from 'three'
import Sun from './world/Sun'
import UniverseEnvironment from './utils/UniverseEnvironment'
import Asteroid from './world/Asteroid'
import { useState } from 'react'
import Particles from './utils/Particles'
import { Vector3 } from 'three'

export default function Experience() {
    const [collisionDetected, setCollisionDetected] = useState(false);
    const [asteroidPosition, setAsteroidPosition] = useState(new Vector3(0, 0, 25));

    return (
        <>
            <OrbitControls makeDefault />
            <UniverseEnvironment />
            <Sun position={[0, 0, 500]} scale={5} />
            <Moon scale={0.005} />
            <Physics debug={false} gravity={[0, 0, -9.8]}>
                <Earth rotation={[-Math.PI / 2, -MathUtils.degToRad(23.5), 0]} scale={0.1} />
                {!collisionDetected && <Asteroid setAsteroidPosition={setAsteroidPosition} setCollisionDetected={setCollisionDetected} position={asteroidPosition} />}
                {collisionDetected && <Particles asteroidPosition={asteroidPosition} count={1000} size={0.1} color={{ r: 1, g: 0, b: 0 }} />}
            </Physics>
        </>
    );
}