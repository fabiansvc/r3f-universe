import React, { useRef } from "react";
import { useGLTF, useAnimations, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BallCollider, RigidBody, RoundCuboidCollider } from "@react-three/rapier";

export default function Earth(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/earth.glb");
  const { actions } = useAnimations(animations, group);

  useFrame((state, delta) => {
    group.current.rotation.z += 0.1 * delta
  })

  const onHandleEnter = () => {
    group.current.cursor = "pointer";
  }

  return (
    <RigidBody colliders="ball" mass={5e12} gravityScale={0}>
      <group  ref={group} {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model">
            <group
              name="fc09fa6deb6c45f687e724438fed81adfbx"
              rotation={[Math.PI / 2, 0, 0]}
              onPointerEnter={onHandleEnter}
            
            >
              <group name="Object_2">
                <group name="RootNode">
                  <group
                    name="Earth"
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={57.39}
                  >
                    <mesh
                      name="Earth_Earth_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Earth_Earth_0.geometry}
                      material={materials.Earth}
                    />
                    <mesh
                      name="Earth_Earth_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Earth_Earth_0_1.geometry}
                      material={materials.Earth}
                    />
                    <mesh
                      name="Earth_Earth_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Earth_Earth_0_2.geometry}
                      material={materials.Earth}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </RigidBody>

  );
}

useGLTF.preload("/models/earth.glb");