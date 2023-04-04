import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useCallback, useEffect, useRef } from "react";
import { scrollAnimation } from "../lib/scroll-animation";

import {
  AssetManagerPlugin,
  BloomPlugin,
  GBufferPlugin,
  GammaCorrectionPlugin,
  ProgressivePlugin,
  SSAOPlugin,
  SSRPlugin,
  TonemapPlugin,
  ViewerApp,
} from "webgi";

gsap.registerPlugin(ScrollTrigger);

export default function WebgiViewer() {
  const canvasRef = useRef(null);

  const memoizedScrollAnimation = useCallback((position, target, onUpdate) => {
    if (position && target && onUpdate) {
      scrollAnimation(position, target, onUpdate);
    }
  }, []);

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    const manager = await viewer.addPlugin(AssetManagerPlugin);

    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline();

    await manager.addFromPath("scene-black.glb");

    // This one removes the bg color and makes the background transparent.
    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    viewer.scene.activeCamera.setCameraOptions({
      controlsEnabled: false,
    });

    window.scrollTo(0, 0);

    let needsUpdate = true;

    viewer.addEventListener("preFrame", () => {
      if (needsUpdate) {
        camera.positionTargetUpdated(true);
        needsUpdate = false;
      }
    });

    const onUpdate = () => {
      needsUpdate = true;
      viewer.setDirty(); // This is needed to force a redraw.
    };

    memoizedScrollAnimation(position, target, onUpdate);
  }, []);

  useEffect(() => {
    setupViewer();
  }, []);

  return (
    <div id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef} />
    </div>
  );
}
