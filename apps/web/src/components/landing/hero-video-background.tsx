"use client";

import { useState } from "react";

const LOCAL_VIDEO = "/hero-bg.mp4";
const CDN_VIDEO =
  "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4";

export function HeroVideoBackground() {
  const [src, setSrc] = useState(LOCAL_VIDEO);
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return <div className="hero-gradient-fallback" aria-hidden="true" />;
  }

  return (
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      src={src}
      onError={() => {
        if (src === LOCAL_VIDEO) {
          setSrc(CDN_VIDEO);
        } else {
          setUseFallback(true);
        }
      }}
    />
  );
}
