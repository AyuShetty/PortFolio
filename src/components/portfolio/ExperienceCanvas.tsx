"use client";

import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function FloatingOrb() {
	return (
		<Float speed={1} rotationIntensity={0.35} floatIntensity={0.7}>
			<mesh>
				<icosahedronGeometry args={[2.25, 1]} />
				<meshStandardMaterial color="#1f7a63" roughness={0.35} metalness={0.18} />
			</mesh>
		</Float>
	);
}

export function ExperienceCanvas() {
	return (
		<Canvas className="experience-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }}>
			<color attach="background" args={["#101211"]} />
			<ambientLight intensity={0.55} />
			<directionalLight position={[3, 2, 4]} intensity={1} color="#e6d5b8" />
			<pointLight position={[-3, -2, -4]} intensity={0.65} color="#1f7a63" />
			<FloatingOrb />
		</Canvas>
	);
}
