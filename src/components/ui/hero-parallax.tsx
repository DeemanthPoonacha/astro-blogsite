"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
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
      className="min-h-[350vh] py-40 mb-80 overflow-hidden  antialiased relative flex flex-col self-auto l[perspective:1000px] l[transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const [diff, setDiff] = useState([0, 0, 0]);

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

  const { scrollYProgress } = useScroll({
    // target: ref,
    // offset: ["0 center", "end center"],
  });
  const zIndex = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 50]),
    springConfig,
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0.6, 1], [1, 3]),
    springConfig,
  );
  const textWidth = useSpring(
    useTransform(scrollYProgress, [0.6, 1], [350, 130]),
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
          className="pb-20 drop-shadow-xl max-w-2xl text-xl max-md:text-2xl text-center py-2 mt-1/2 dark:text-neutral-200"
        >
          Your ultimate destination for insightful articles
        </motion.p>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
