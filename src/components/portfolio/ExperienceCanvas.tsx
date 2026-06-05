"use client";

import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function FloatingOrb({ isDark }: { isDark: boolean }) {
        return (
                <Float speed={1} rotationIntensity={0.35} floatIntensity={0.7}>
                        <mesh>
                                <icosahedronGeometry args={[2.25, 1]} />
                                <meshStandardMaterial color={isDark ? "#D2FF00" : "#2D3126"} roughness={0.35} metalness={0.18} />
                        </mesh>
                </Float>
        );
}

export function ExperienceCanvas() {
        const { resolvedTheme } = useTheme();
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
                setMounted(true);
        }, []);

        const isDark = !mounted || resolvedTheme === "dark";
        const bgColor = isDark ? "#111112" : "#F4F3F1";
        const ambientIntensity = isDark ? 0.55 : 0.8;
        const mainLightColor = isDark ? "#D2FF00" : "#2D3126";
        const backLightColor = isDark ? "#B8E600" : "#1A1D16";

        return (
                <Canvas className="experience-canvas transition-colors duration-500" dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }}>
                        <color attach="background" args={[bgColor]} />
                        <ambientLight intensity={ambientIntensity} />
                        <directionalLight position={[3, 2, 4]} intensity={1} color={mainLightColor} />
                        <pointLight position={[-3, -2, -4]} intensity={0.65} color={backLightColor} />
                        <FloatingOrb isDark={isDark} />
                </Canvas>
        );
}
