import { useEffect, useRef } from "react";

interface WatermarkOptions {
  content: string; // 水印文本内容
  width?: number; // 单个水印宽度
  height?: number; // 单个水印高度
  rotate?: number; // 旋转角度
  fontSize?: number; // 字体大小
  fontFamily?: string; // 字体
  fontColor?: string; // 字体颜色
  opacity?: number; // 透明度
  zIndex?: number; // 层级
  gapX?: number; // 水平间距
  gapY?: number; // 垂直间距
}

const DEFAULT_OPTIONS: Partial<WatermarkOptions> = {
  width: 300,
  height: 100,
  rotate: -22,
  fontSize: 16,
  fontFamily: "Arial",
  fontColor: "rgba(0, 0, 0, 0.15)",
  opacity: 1,
  zIndex: 2000,
  gapX: 100,
  gapY: 100,
};

export const useWatermark = (options: WatermarkOptions) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  // 创建单个水印的 base64 图片
  const createWatermarkImage = (): string => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const { width, height, content, rotate, fontSize, fontFamily, fontColor } =
      mergedOptions;

    // 根据设备像素比调整 canvas 大小，保证清晰度
    const ratio = window.devicePixelRatio || 1;
    const scaledWidth = (width as number) * ratio;
    const scaledHeight = (height as number) * ratio;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    ctx.scale(ratio, ratio);
    ctx.translate((width as number) / 2, (height as number) / 2);
    ctx.rotate(((rotate as number) * Math.PI) / 180);
    ctx.translate(-(width as number) / 2, -(height as number) / 2);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor as string;
    ctx.fillText(content, (width as number) / 2, (height as number) / 2);

    return canvas.toDataURL();
  };

  // 创建水印容器
  const createWatermark = () => {
    if (!containerRef.current) return;

    const { zIndex, opacity, gapX, gapY } = mergedOptions;
    const base64Url = createWatermarkImage();

    // 创建水印层
    const watermarkDiv = document.createElement("div");
    watermarkDiv.style.position = "absolute";
    watermarkDiv.style.top = "0";
    watermarkDiv.style.left = "0";
    watermarkDiv.style.width = "100%";
    watermarkDiv.style.height = "100%";
    watermarkDiv.style.pointerEvents = "none";
    watermarkDiv.style.backgroundImage = `url(${base64Url})`;
    watermarkDiv.style.backgroundRepeat = "repeat";
    watermarkDiv.style.backgroundPosition = `${gapX}px ${gapY}px`;
    watermarkDiv.style.zIndex = String(zIndex);
    watermarkDiv.style.opacity = String(opacity);

    // 移除旧的水印
    if (watermarkRef.current) {
      containerRef.current.removeChild(watermarkRef.current);
    }

    containerRef.current.appendChild(watermarkDiv);
    watermarkRef.current = watermarkDiv;

    // 添加 MutationObserver 防止水印被篡改
    const observer = new MutationObserver(() => {
      const watermark = watermarkRef.current;
      if (!watermark || !watermark.parentElement) {
        createWatermark();
      }
    });

    observer.observe(containerRef.current, {
      childList: true,
      attributes: true,
      subtree: true,
    });

    return () => observer.disconnect();
  };

  useEffect(() => {
    if (containerRef.current) {
      createWatermark();
    }
  }, [options]);

  return {
    containerRef,
    setWatermark: createWatermark,
  };
};
