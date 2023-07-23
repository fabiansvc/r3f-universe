import { Stars } from "@react-three/drei";

export default function UniverseEnvironment(){
    return<>
        <directionalLight position={[1, 0, 9]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
}