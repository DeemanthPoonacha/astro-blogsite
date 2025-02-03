import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import InfiniteMovingCards from "./InfiniteMovingCards";
import HeroBanner from "./HeroBanner";

const HeroParallax = ({
  items,
}: {
  items: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = items.slice(0, 5);
  const secondRow = items.slice(5, 10);
  const thirdRow = items.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );
  const [refHeight, setRefHeight] = useState(
    ref.current?.getBoundingClientRect().height || 1200,
  );
  console.log("🚀 ~ refHeight:", refHeight);
  useEffect(() => {
    console.log("🚀 ~ window:", window.innerHeight);

    if (ref.current)
      setRefHeight(
        (ref.current.getBoundingClientRect().height / window.innerHeight) *
          1000,
      );
  }, [ref.current]);

  return (
    <div
      ref={ref}
      // className="min-h-[380svh] [@media(max-height:953px)]:min-h-[500svh] [@media(max-height:953px)]:mb-[100svh]  [@media(max-height:800px)]:min-h-[600svh] mb-12 [@media(max-height:800px)]:mb-[240svh] -mt-8 overflow-hidden  antialiased relative flex flex-col self-auto l[perspective:1000px] l[transform-style:preserve-3d]"
      className="-mt-8 overflow-hidden antialiased relative flex flex-col self-auto"
      style={{ marginBottom: refHeight + 56 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="mt-[50%]"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          <InfiniteMovingCards items={firstRow} speed="slow" />
        </motion.div>
        <motion.div className="flex flex-row space-x-20">
          <InfiniteMovingCards
            items={secondRow}
            direction="right"
            speed="slow"
          />
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          <InfiniteMovingCards items={thirdRow} speed="slow" />
        </motion.div>
      </motion.div>
      <HeroBanner />
    </div>
  );
};

export default HeroParallax;
