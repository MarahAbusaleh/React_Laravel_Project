 //import React from "react";
import { Link } from "react-router-dom";
import React, { useRef, useEffect } from "react";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
    }
  }, []);

  return (
    <section>
      <video ref={videoRef} width="100%" height="30%">
        <source
          src="https://dji-official-fe.djicdn.com/reactor/assets/_next/static/videos/a86ba760-3f8c-42b4-bbd6-c7c31d79c248.webm"
          type="video/webm"
        />
      </video>
    </section>
  );
};

export default Hero;
