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

    const posTags = document
      .getElementById("mainTags")
      ?.getBoundingClientRect().top;
    console.log(posRef, posMain, posTags);
  }, []);

  const { scrollYProgress } = useScroll({});
  // const zIndex = useSpring(
  //   useTransform(scrollYProgress, [0, 0.2], [10, -5990]),
  //   springConfig,
  // );

  const scale = useSpring(
    useTransform(scrollYProgress, [0.3, 0.6], [1, 2.77]),
    springConfig,
  );
  const ctaMt = useSpring(
    useTransform(scrollYProgress, [0.3, 0.6], [12, 150]),
    springConfig,
  );

  const textWidth = useSpring(
    useTransform(scrollYProgress, [0.3, 0.6], [350, 140]),
    springConfig,
  );
  const translateYSubTitle = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2, 0.6, 0.7],
      [0, -diff[1], -diff[1], -17 * diff[1]],
    ),
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
  const yOffset = diff[2] > 56 ? 14 : 20;
  const translateYTitle = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, -diff[1] - 360 + yOffset]),
    springConfig,
  );

  return (
    <div className="max-w-7xl relative mx-auto w-full flex flex-col items-center min-h-svh">
      <motion.img
        id="mainLogo"
        style={{
          width,
          translateX,
          translateY,
          // zIndex,
        }}
        src="/images/logo.png"
        alt="Bloggy logo"
        width={250}
        height={250}
        className="z-50 pointer-events-none fixed top-1/4 text-center rounded-xl invert dark:invert-0 -mt-20"
      />
      <motion.p
        style={{
          translateX: translateXTitle,
          translateY: translateYTitle,
          // zIndex,
        }}
        className="z-50 pointer-events-none fixed top-[calc(25%+360px)] uppercase prose font-blod text-3xl sm:text-6xl text-zinc-900 dark:text-zinc-100 -mt-20"
      >
        Bloggy
      </motion.p>
      <motion.div
        className="fixed top-[calc(25%+420px)] flex flex-col items-center gap-2 justify-between -mt-20"
        style={{
          width: textWidth,
          // height: translateYSubTitle,
          translateY: translateYSubTitle,
        }}
      >
        <motion.p
          style={{ scale }}
          className="-z-50 pointer-events-none p-2 drop-shadow-xl max-w-2xl text-xl max-md:text-2xl text-center py-2 mt-1/2 prose dark:prose-invert"
        >
          Your ultimate destination for insightful articles
        </motion.p>

        <motion.a
          style={{ marginTop: ctaMt }}
          className="z-50 w-64 prose prose-xl bg-primary text-primary-foreground rounded-full p-4 text-center cursor-pointer font-bold px-5 py-2.5 overflow-hidden group bg-cyan-500 relative hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-cyan-400 transition-all ease-out duration-300"
          href="/dashboard"
        >
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute right-0 w-8 h-32 -mt-20 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          Let's get started!
        </motion.a>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
