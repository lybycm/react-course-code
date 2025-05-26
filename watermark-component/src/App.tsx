import React from "react";
import { Watermark } from "./Watermark";

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>水印组件示例</h1>

      {/* 基础用法 */}
      <Watermark content="机密文件" style={{ padding: 20 }}>
        <div style={{ height: 300, background: "#f5f5f5", padding: 20 }}>
          <h2>基础水印</h2>
          <p>这是一些示例内容，水印会显示在整个区域内。</p>
        </div>
      </Watermark>

      {/* 自定义样式 */}
      <Watermark
        content="CONFIDENTIAL"
        fontColor="rgba(255, 0, 0, 0.1)"
        fontSize={20}
        rotate={-30}
        style={{ padding: 20, marginTop: 20 }}
      >
        <div
          style={{
            height: 300,
            background: "#fff",
            padding: 20,
            border: "1px solid #ddd",
          }}
        >
          <h2>自定义样式的水印</h2>
          <p>
            这个示例展示了如何自定义水印的样式，包括颜色、大小和旋转角度等。
          </p>
        </div>
      </Watermark>

      {/* 密集水印 */}
      <Watermark
        content="TOP SECRET"
        gapX={50}
        gapY={50}
        fontSize={14}
        opacity={0.8}
        style={{ padding: 20, marginTop: 20 }}
      >
        <div style={{ height: 300, background: "#f0f2f5", padding: 20 }}>
          <h2>密集水印</h2>
          <p>通过调整 gapX 和 gapY 可以控制水印的密度。</p>
        </div>
      </Watermark>
    </div>
  );
};

export default App;
