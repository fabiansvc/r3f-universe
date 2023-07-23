import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, BufferAttribute } from 'three';

export default function Particles({ asteroidPosition, count, size, color }) {
  const pointsRef = useRef();

  // Crea la geometría de las partículas
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Genera posiciones aleatorias en un rango
    positions[i3] = asteroidPosition.x ;
    positions[i3 + 1] = asteroidPosition.y;
    positions[i3 + 2] = asteroidPosition.z;

    // Establece un color para cada partícula
    colors[i3] = color.r * Math.random();
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    // Genera velocidades aleatorias para la caída
    velocities[i3] = (Math.random() - 0.5) * 0.1; // Velocidad en el eje X (horizontal)
    velocities[i3 + 1] = -Math.random() * 0.1; // Velocidad en el eje Y (vertical)
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.1; // Velocidad en el eje Z (profundidad)
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));

  useFrame(() => {
    const positionsAttribute = geometry.getAttribute('position');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Actualiza la posición de la partícula según su velocidad
      positionsAttribute.array[i3] += velocities[i3];
      positionsAttribute.array[i3 + 1] += velocities[i3 + 1];
      positionsAttribute.array[i3 + 2] += velocities[i3 + 2];
     }

    positionsAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial size={size} vertexColors={true} />
    </points>
  );
}