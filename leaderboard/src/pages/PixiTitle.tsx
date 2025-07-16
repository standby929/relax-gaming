import { useEffect, useRef } from 'react';
import { Application, FillGradient, Text } from 'pixi.js';

export default function PixiTitle() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: Application;

    const initPixi = async () => {
      // Wait for the next frame to ensure the container is ready
      await new Promise((resolve) => requestAnimationFrame(resolve));

      if (!containerRef.current) return;

      app = new Application();

      await app.init({
        resizeTo: containerRef.current,
        backgroundAlpha: 0,
        antialias: true,
      });

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(app.canvas);

      const verticalGradient = new FillGradient(0, 0, 0, 1)
        .addColorStop(0, 0xff0000)
        .addColorStop(1, 0x0000ff);

      const text = new Text('TOP 10 PLAYERS', {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: verticalGradient,
        fontWeight: 'bold',
        align: 'center',
      });

      text.anchor.set(0.5);
      text.x = app.renderer.width / 2;
      text.y = 60;

      app.stage.addChild(text);

      let scaleDir = 1;
      app.ticker.add(() => {
        text.scale.x += 0.005 * scaleDir;
        text.scale.y += 0.005 * scaleDir;
        if (text.scale.x > 1.1 || text.scale.x < 0.9) scaleDir *= -1;
      });
    };

    initPixi();

    return () => {
      app?.destroy?.(true, { children: true });
    };
  }, []);

  return <div ref={containerRef} className="w-full h-24" />;
}
