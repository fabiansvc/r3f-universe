
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Moon(props) {
  const { nodes, materials } = useGLTF("/models/moon.glb")  
  const moonRef = useRef()

  useFrame(({ clock }) => {
    // Calcular la posición y la rotación de la luna en cada cuadro de la animación
    if (moonRef.current) {
      const elapsedTime = clock.getElapsedTime();
      const orbitRadius = 30; // Modifica el radio de la órbita según tus necesidades
      const orbitSpeed = 0.1; // Modifica la velocidad de órbita según tus necesidades

      // Calcular la posición de la luna en la órbita
      const angle = elapsedTime * orbitSpeed;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      moonRef.current.position.set(x, 10, z);

      // Orientar la luna hacia el centro de la órbita (la Tierra)
      const rotationAngle = angle + Math.PI / 2; // Ajustar el ángulo inicial según tus necesidades
      moonRef.current.rotation.y = rotationAngle;
    }
  });

  return (
    <group ref={moonRef} {...props} dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials["Default OBJ.005"]}
      />
    </group>
  );
}

useGLTF.preload("/models/moon.glb");