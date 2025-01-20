import { motion } from "framer-motion";
import { useState } from "react";

const navMotion = {
  visible: {
    width: 300,
    transition: {
      staggerChildren: 0.1,
    },
  },
  hidden: {
    width: 0,
  },
};
const itemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 100 },
};
const navLinks = [
  { name: "Home", href: "/", id: "home" },
  { name: "Blog", href: "/blog", id: "blog" },
  { name: "Authors", href: "/authors", id: "authors" },
  { name: "About", href: "/about", id: "about" },
];

const NavLinks = ({
  isMobile,
  className,
  currentPath = "home",
}: {
  isMobile: boolean;
  className: string;
  currentPath: string;
}) => (
  <div className={className}>
    {navLinks.map(({ name, href, id }) => (
      <motion.a
        className={
          currentPath === "/" && href === "/"
            ? "text-cyan-500 dark:text-cyan-600"
            : currentPath.includes(href) && href !== "/"
              ? "text-cyan-500 dark:text-cyan-600"
              : "hover:text-cyan-500 hover:dark:text-cyan-600"
        }
        key={id}
        variants={isMobile ? itemMotion : {}}
        href={href}
      >
        {name}
      </motion.a>
    ))}
  </div>
);

export default function Nav({ currentPath }: { currentPath: string }) {
  const [toggled, setToggled] = useState(false);
  const hamburger = (
    <motion.div
      transition={{ delay: 0.25 }}
      onClick={() => setToggled((prevToggle) => !prevToggle)}
      className={`flex flex-col items-end z-50 cursor-pointer space-y-1.5 lg:hidden`}
    >
      <motion.span
        animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
        className="line-1 block h-0.5 w-8 bg-black dark:bg-white text-end"
      ></motion.span>

      <motion.span
        animate={{ width: toggled ? 0 : 28 }}
        className="line-2 block h-0.5 w-7 bg-black dark:bg-white text-end"
      ></motion.span>
      <motion.span
        animate={{
          rotateZ: toggled ? -45 : 0,
          y: toggled ? -8 : 0,
          width: toggled ? 32 : 24,
        }}
        className="line-3 block h-0.5 w-6 bg-black dark:bg-white text-end"
      ></motion.span>
    </motion.div>
  );

  return (
    <nav className="flex items-center justify-between font-medium">
      {toggled && (
        <motion.div
          variants={navMotion}
          animate="visible"
          initial="hidden"
          className="z-50 lg:hidden fixed shadow-2xl dark:shadow-slate-800 right-0 top-0 flex h-screen
          w-96 flex-col items-center  justify-center gap-24  bg-gray-50/95 dark:bg-gray-950/95  text-2xl font-bold"
        >
          <NavLinks
            currentPath={currentPath}
            className="flex flex-col gap-24 text-lg"
            isMobile={true}
          />
        </motion.div>
      )}
      <motion.div className="z-50 hidden lg:flex lg:items-center  lg:justify-center lg:gap-12 lg:text-lg">
        <NavLinks
          currentPath={currentPath}
          className="flex gap-12"
          isMobile={false}
        />
      </motion.div>
      {hamburger}
    </nav>
  );
}
