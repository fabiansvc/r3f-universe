import { useRef, useEffect} from 'react';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';

const Asteroid = (props)=> {
  const asteroidRBRef = useRef();
  const meshRef = useRef(); // Reference to the mesh
  const { nodes } = useGLTF("/models/asteroid.glb");

  useEffect(() => {
    if (asteroidRBRef.current) {
      asteroidRBRef.current.applyImpulse({ x: 0, y: 10, z: 0 }, true)
    }
  }, []);

  const onCollisionAsteroid = ({manifold}) => {
    props.setCollisionDetected(true);

    const asteroidPosition = new Vector3(manifold.solverContactPoint(0).x, manifold.solverContactPoint(0).y, manifold.solverContactPoint(0).z);
    props.setAsteroidPosition( asteroidPosition);
  }

  return <>
    <RigidBody ref={asteroidRBRef} mass={1e5} gravityScale={0.1} onCollisionEnter={onCollisionAsteroid}>
      <group {...props} dispose={null}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          geometry={nodes.file1.geometry}
          material={nodes.file1.material}
          rotation={[-Math.PI / 2, 0, 0]}
 
        />
      </group>
    </RigidBody>
  </>
}
export default Asteroid;

useGLTF.preload("/models/asteroid.glb");
