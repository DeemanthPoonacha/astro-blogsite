import { useRef } from "react";
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
  const ref = useRef(null);
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
  return (
    <div
      ref={ref}
      className="min-h-[350svh] -mt-5 overflow-hidden  antialiased relative flex flex-col self-auto l[perspective:1000px] l[transform-style:preserve-3d]"
    >
      <HeroBanner />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="mt-40"
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
    </div>
  );
};

export default HeroParallax;
