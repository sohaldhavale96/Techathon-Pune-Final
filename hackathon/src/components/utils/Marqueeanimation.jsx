import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from "react"

const InfiniteMarquee = ({ children, speed = 20 }) => {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: 'x',
  });

  const x = useTransform(scrollXProgress, [0, 1], ['0%', `-${100 / speed}%`]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo(0, 0);
    }

    const intervalId = setInterval(() => {
      if (container) {
        container.scrollBy(1, 0);
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollTo(0, 0);
        }
      }
    }, 16);

    return () => clearInterval(intervalId);
  }, [speed]);

  const repeats = 20;

  return (
    <div
      ref={containerRef}
      style={{
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
      }}
    >
      <motion.div
        style={{ display: 'inline-flex', minWidth: `${repeats * 100}%` }} // Adjust minWidth
        animate={{ x }}
        transition={{ ease: 'linear', duration: speed }}
      >
        {Array.from({ length: repeats }, (_, index) => (
          <React.Fragment key={index}>{children}</React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Marqueeanimation = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <InfiniteMarquee speed={70}>
        <span style={{ margin: '0 20px', fontSize: '4em', whiteSpace: 'nowrap' }}>
          <h1 className="font-bold text-[#0B6BCB]">Building bridges, sharing hope, one meal at time.</h1>
        </span>
      </InfiniteMarquee>
    </div>
  );
};

export default Marqueeanimation;