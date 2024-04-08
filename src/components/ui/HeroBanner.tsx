import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const HeroBanner = () => {
  const [diff, setDiff] = useState([0, 0, 0]);
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  useEffect(() => {
    const posRef = document
      .getElementById("headerLogo")
      ?.getBoundingClientRect();

    const posMain = document
      .getElementById("mainLogo")
      ?.getBoundingClientRect();
    if (posMain && posRef) {
      setDiff([posMain.x - posRef.x, posMain.y - posRef.y, posRef.width]);
    }
    console.log(posRef, posMain);
  }, []);

  const { scrollYProgress } = useScroll({});
  const zIndex = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 50]),
    springConfig,
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0.6, 1], [1, 2.77]),
    springConfig,
  );
  const textWidth = useSpring(
    useTransform(scrollYProgress, [0.6, 1], [350, 140]),
    springConfig,
  );

  const width = useSpring(
    useTransform(scrollYProgress, [0.1, 0.2], [250, diff[2]]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(scrollYProgress, [0.1, 0.3], [0, -diff[0] - 95]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, -diff[1]]),
    springConfig,
  );

  const xOffset = diff[2] > 56 ? 70 : -7;
  const translateXTitle = useSpring(
    useTransform(scrollYProgress, [0.1, 0.3], [0, -diff[0] + xOffset]),
    springConfig,
  );
  const yOffset = +diff[2] > 56 ? 14 : 20;
  const translateYTitle = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, -diff[1] - 360 + yOffset]),
    springConfig,
  );
  return (
    <div className="h-96 pointer-events-none max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full flex flex-col items-center ">
      <motion.img
        id="mainLogo"
        style={{
          width,
          translateX,
          translateY,
          zIndex,
        }}
        src="/images/logo.png"
        alt="Bloggy logo"
        width={250}
        height={250}
        className="z-50 fixed top-1/4 text-center rounded-xl invert dark:invert-0"
      />
      <motion.p
        style={{
          translateX: translateXTitle,
          translateY: translateYTitle,
          zIndex,
        }}
        className="z-50 fixed top-[calc(25%+360px)] uppercase prose font-blod text-3xl sm:text-6xl text-zinc-900 dark:text-zinc-100"
      >
        Bloggy
      </motion.p>
      <motion.div
        className="fixed top-[calc(25%+420px)] -z-10"
        style={{ width: textWidth, translateY }}
      >
        <motion.p
          style={{ scale }}
          className="-z-50 p-2 pb-20 drop-shadow-xl max-w-2xl text-xl max-md:text-2xl text-center py-2 mt-1/2 dark:text-neutral-200"
        >
          Your ultimate destination for insightful articles
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
