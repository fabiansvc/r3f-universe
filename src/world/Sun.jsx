import React, { useRef } from "react";

export default function Sun(props) {
    
    return (
        <mesh {...props}>
            <sphereGeometry args={[1, 32, 32]} rotateY={-Math.PI/2}/>
            <meshBasicMaterial color={"yellow"}/>
        </mesh>
    )
}

