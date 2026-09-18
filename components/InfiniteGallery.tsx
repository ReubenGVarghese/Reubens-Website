"use client";

import type React from "react";
import {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
  Suspense,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
  fadeIn: { start: number; end: number };
  fadeOut: { start: number; end: number };
}

interface BlurSettings {
  blurIn: { start: number; end: number };
  blurOut: { start: number; end: number };
  maxBlur: number;
}

export interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

type ScrollApi = {
  velocity: number;
  autoPlay: boolean;
  lastInteraction: number;
};

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;
const MOBILE_HORIZONTAL_OFFSET = 1.6;
const MOBILE_VERTICAL_OFFSET = 2.0;
const MOBILE_BREAKPOINT = 768;
const MOBILE_VISIBLE_CAP = 8;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const widthQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const sync = () => setIsMobile(widthQuery.matches || coarseQuery.matches);
    sync();
    widthQuery.addEventListener("change", sync);
    coarseQuery.addEventListener("change", sync);
    return () => {
      widthQuery.removeEventListener("change", sync);
      coarseQuery.removeEventListener("change", sync);
    };
  }, []);

  return isMobile;
}

const createClothMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        float curveIntensity = scrollForce * 0.3;
        
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });

function ImagePlane({
  texture,
  position,
  scale,
  material,
  meshRef,
  enableHover,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.ShaderMaterial;
  meshRef?: (mesh: THREE.Mesh | null) => void;
  enableHover: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (material && texture) {
      material.uniforms.map.value = texture;
    }
  }, [material, texture]);

  useEffect(() => {
    if (material && material.uniforms) {
      material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
    }
  }, [material, isHovered]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={material}
      onPointerEnter={enableHover ? () => setIsHovered(true) : undefined}
      onPointerLeave={enableHover ? () => setIsHovered(false) : undefined}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

function GalleryScene({
  images,
  speed = 1,
  visibleCount = 8,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 3.0,
  },
  isMobile = false,
  scrollApi,
}: Omit<InfiniteGalleryProps, "className" | "style"> & {
  isMobile?: boolean;
  scrollApi: React.MutableRefObject<ScrollApi>;
}) {
  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === "string" ? { src: img, alt: "" } : img
      ),
    [images]
  );

  const textures = useTexture(normalizedImages.map((img) => img.src));
  const textureList = useMemo(
    () => (Array.isArray(textures) ? textures : [textures]),
    [textures]
  );

  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount]
  );

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    const maxHorizontalOffset = isMobile
      ? MOBILE_HORIZONTAL_OFFSET
      : MAX_HORIZONTAL_OFFSET;
    const maxVerticalOffset = isMobile
      ? MOBILE_VERTICAL_OFFSET
      : MAX_VERTICAL_OFFSET;

    for (let i = 0; i < visibleCount; i++) {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

      const horizontalRadius = (i % 3) * (isMobile ? 0.55 : 1.2);
      const verticalRadius = ((i + 1) % 4) * (isMobile ? 0.4 : 0.8);

      const x =
        (Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) /
        3;
      const y =
        (Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset) / 4;

      positions.push({ x, y });
    }

    return positions;
  }, [isMobile, visibleCount]);

  const totalImages = normalizedImages.length;
  const depthRange = DEFAULT_DEPTH_RANGE;

  const buildPlanes = useCallback(
    (): PlaneData[] =>
      Array.from({ length: visibleCount }, (_, i) => ({
        index: i,
        z:
          visibleCount > 0
            ? ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange
            : 0,
        imageIndex: totalImages > 0 ? i % totalImages : 0,
        x: spatialPositions[i]?.x ?? 0,
        y: spatialPositions[i]?.y ?? 0,
      })),
    [depthRange, spatialPositions, totalImages, visibleCount]
  );

  const planesData = useRef<PlaneData[]>(buildPlanes());
  const meshRefs = useRef<Array<THREE.Mesh | null>>(
    Array.from({ length: visibleCount }, () => null)
  );
  const lastImageIndex = useRef<number[]>(
    Array.from({ length: visibleCount }, () => -1)
  );
  const [planeVersion, setPlaneVersion] = useState(0);

  useEffect(() => {
    planesData.current = buildPlanes();
    meshRefs.current = Array.from({ length: visibleCount }, () => null);
    lastImageIndex.current = Array.from({ length: visibleCount }, () => -1);
    setPlaneVersion((v) => v + 1);
  }, [buildPlanes, visibleCount]);

  useFrame((state, delta) => {
    const api = scrollApi.current;

    if (api.autoPlay) {
      api.velocity += 0.3 * delta;
    }

    api.velocity *= 0.95;
    api.velocity = Math.max(-12, Math.min(12, api.velocity));
    const scrollVelocity = api.velocity;

    const time = state.clock.getElapsedTime();
    materials.forEach((material) => {
      if (material?.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.scrollForce.value = scrollVelocity;
      }
    });

    const imageAdvance =
      totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    const totalRange = depthRange;
    const base = isMobile ? 1.25 : 2;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocity * delta * 10;
      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (newZ >= totalRange) {
        wrapsForward = Math.floor(newZ / totalRange);
        newZ -= totalRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / totalRange);
        newZ += totalRange * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
        plane.imageIndex =
          (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      }

      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % totalRange) + totalRange) % totalRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;

      const normalizedPosition = plane.z / totalRange;
      let opacity = 1;

      if (
        normalizedPosition >= fadeSettings.fadeIn.start &&
        normalizedPosition <= fadeSettings.fadeIn.end
      ) {
        opacity =
          (normalizedPosition - fadeSettings.fadeIn.start) /
          (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
      } else if (normalizedPosition < fadeSettings.fadeIn.start) {
        opacity = 0;
      } else if (
        normalizedPosition >= fadeSettings.fadeOut.start &&
        normalizedPosition <= fadeSettings.fadeOut.end
      ) {
        opacity =
          1 -
          (normalizedPosition - fadeSettings.fadeOut.start) /
            (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
      } else if (normalizedPosition > fadeSettings.fadeOut.end) {
        opacity = 0;
      }

      opacity = Math.max(0, Math.min(1, opacity));

      let blur = 0;
      if (
        normalizedPosition >= blurSettings.blurIn.start &&
        normalizedPosition <= blurSettings.blurIn.end
      ) {
        blur =
          blurSettings.maxBlur *
          (1 -
            (normalizedPosition - blurSettings.blurIn.start) /
              (blurSettings.blurIn.end - blurSettings.blurIn.start));
      } else if (normalizedPosition < blurSettings.blurIn.start) {
        blur = blurSettings.maxBlur;
      } else if (
        normalizedPosition >= blurSettings.blurOut.start &&
        normalizedPosition <= blurSettings.blurOut.end
      ) {
        blur =
          blurSettings.maxBlur *
          ((normalizedPosition - blurSettings.blurOut.start) /
            (blurSettings.blurOut.end - blurSettings.blurOut.start));
      } else if (normalizedPosition > blurSettings.blurOut.end) {
        blur = blurSettings.maxBlur;
      }

      blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

      const material = materials[i];
      if (material?.uniforms) {
        material.uniforms.opacity.value = opacity;
        material.uniforms.blurAmount.value = blur;
      }

      const worldZ = plane.z - depthRange / 2;
      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.set(plane.x, plane.y, worldZ);

        const texture = textureList[plane.imageIndex];
        if (texture?.image) {
          const aspect = texture.image.width / texture.image.height || 1;
          if (aspect > 1) mesh.scale.set(base * aspect, base, 1);
          else mesh.scale.set(base, base / aspect, 1);
        }

        if (lastImageIndex.current[i] !== plane.imageIndex && material?.uniforms) {
          material.uniforms.map.value = textureList[plane.imageIndex] ?? null;
          lastImageIndex.current[i] = plane.imageIndex;
        }
      }
    });
  });

  if (normalizedImages.length === 0) return null;

  const base = isMobile ? 1.25 : 2;

  return (
    <>
      {planesData.current.map((plane, i) => {
        const texture = textureList[plane.imageIndex];
        const material = materials[i];
        if (!texture || !material) return null;

        const worldZ = plane.z - depthRange / 2;
        const aspect = texture.image
          ? texture.image.width / texture.image.height
          : 1;
        const scale: [number, number, number] =
          aspect > 1 ? [base * aspect, base, 1] : [base, base / aspect, 1];

        return (
          <ImagePlane
            key={`${plane.index}-${planeVersion}`}
            texture={texture}
            position={[plane.x, plane.y, worldZ]}
            scale={scale}
            material={material}
            enableHover={!isMobile}
            meshRef={(mesh) => {
              meshRefs.current[i] = mesh;
            }}
          />
        );
      })}
    </>
  );
}

function FallbackGallery({ images }: { images: ImageItem[] }) {
  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === "string" ? { src: img, alt: "" } : img
      ),
    [images]
  );

  return (
    <div className="flex h-full flex-col items-center justify-center bg-neutral-900 p-4">
      <p className="mb-4 text-sm text-neutral-400">
        WebGL not supported. Showing image list:
      </p>
      <div className="grid max-h-[70dvh] grid-cols-2 gap-3 overflow-y-auto">
        {normalizedImages.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src || "/placeholder.svg"}
            alt={img.alt}
            className="h-36 w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default function InfiniteGallery({
  images,
  className = "h-96 w-full",
  style,
  speed = 1,
  visibleCount = 8,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4, end: 0.43 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollApi = useRef<ScrollApi>({
    velocity: 0,
    autoPlay: true,
    lastInteraction: Date.now(),
  });
  const pointerRef = useRef<{
    id: number | null;
    lastX: number;
    lastY: number;
    lastT: number;
    samples: Array<{ delta: number; dt: number }>;
  }>({
    id: null,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    samples: [],
  });

  const effectiveVisibleCount = isMobile
    ? Math.min(visibleCount, MOBILE_VISIBLE_CAP)
    : visibleCount;

  const markInteraction = useCallback(() => {
    scrollApi.current.autoPlay = false;
    scrollApi.current.lastInteraction = Date.now();
  }, []);

  const addVelocity = useCallback(
    (amount: number) => {
      scrollApi.current.velocity += amount;
      markInteraction();
    },
    [markInteraction]
  );

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - scrollApi.current.lastInteraction > 3000) {
        scrollApi.current.autoPlay = true;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      addVelocity(event.deltaY * 0.01 * speed);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        addVelocity(-2 * speed);
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        addVelocity(2 * speed);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      el.setPointerCapture(event.pointerId);
      pointerRef.current = {
        id: event.pointerId,
        lastX: event.clientX,
        lastY: event.clientY,
        lastT: performance.now(),
        samples: [],
      };
      markInteraction();
    };

    const onPointerMove = (event: PointerEvent) => {
      const state = pointerRef.current;
      if (state.id !== event.pointerId) return;

      event.preventDefault();
      const now = performance.now();
      const dx = event.clientX - state.lastX;
      const dy = event.clientY - state.lastY;
      const dt = Math.max(now - state.lastT, 1);
      const dominant = Math.abs(dy) >= Math.abs(dx) ? dy : -dx;
      const sensitivity = event.pointerType === "touch" ? 0.055 : 0.035;

      addVelocity(dominant * sensitivity * speed);
      state.samples.push({ delta: dominant, dt });
      if (state.samples.length > 5) state.samples.shift();

      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastT = now;
    };

    const endPointer = (event: PointerEvent) => {
      const state = pointerRef.current;
      if (state.id !== event.pointerId) return;

      if (state.samples.length > 0) {
        const totalDelta = state.samples.reduce((s, x) => s + x.delta, 0);
        const totalDt = state.samples.reduce((s, x) => s + x.dt, 0);
        const flick = (totalDelta / Math.max(totalDt, 1)) * 16 * speed;
        addVelocity(flick);
      }

      pointerRef.current.id = null;
      pointerRef.current.samples = [];
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", endPointer);
    el.addEventListener("pointercancel", endPointer);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endPointer);
      el.removeEventListener("pointercancel", endPointer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [addVelocity, markInteraction, speed]);

  if (!webglSupported) {
    return (
      <div className={className} style={style}>
        <FallbackGallery images={images} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        touchAction: "none",
        overscrollBehavior: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        cursor: isMobile ? "default" : "grab",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 0], fov: isMobile ? 68 : 55 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: "none", pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <GalleryScene
            images={images}
            speed={speed}
            visibleCount={effectiveVisibleCount}
            fadeSettings={fadeSettings}
            blurSettings={blurSettings}
            isMobile={isMobile}
            scrollApi={scrollApi}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
