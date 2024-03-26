import { motion } from "framer-motion";
import { useState } from "react";

const navMotion = {
  visible: {
    width: 300,
    transition: {
      when: "beforeChildren",
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
const itemMotionDesktop = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 1, x: 0 },
};
const navLinks = [
  { name: "Home", href: "/", id: 1 },
  { name: "Blog", href: "/blog", id: 2 },
  { name: "About", href: "/about", id: 3 },
];

const NavLinks = ({
  isMobile,
  className,
}: {
  isMobile: boolean;
  className: string;
}) => (
  <div className={className}>
    {navLinks.map(({ name, href, id }) => (
      <motion.a
        key={id}
        variants={isMobile ? itemMotion : itemMotionDesktop}
        href={href}
      >
        {name}
      </motion.a>
    ))}
  </div>
);

export default function Nav() {
  const [toggled, setToggled] = useState(false);
  const hamburger = (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.25 }}
      onClick={() => setToggled((prevToggle) => !prevToggle)}
      className={`flex flex-col items-end z-50 cursor-pointer space-y-1.5 lg:hidden`}
    >
      <motion.span
        animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
        className="line-1 block h-0.5 w-8 bg-black text-end"
      ></motion.span>

      <motion.span
        animate={{ width: toggled ? 0 : 28 }}
        className="line-2 block h-0.5 w-7 bg-black text-end"
      ></motion.span>
      <motion.span
        animate={{
          rotateZ: toggled ? -45 : 0,
          y: toggled ? -8 : 0,
          width: toggled ? 32 : 24,
        }}
        className="line-3 block h-0.5 w-6 bg-black text-end"
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
          className="fixed right-0 top-0  z-40 flex h-screen
          w-96 flex-col items-center  justify-center gap-24 bg-blue-50 text-2xl font-bold"
        >
          <NavLinks className="flex flex-col gap-24 text-lg " isMobile={true} />
        </motion.div>
      )}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 25 }}
        transition={{ delay: 0.35 }}
        className="hidden lg:flex lg:items-center  lg:justify-center lg:gap-12 lg:text-lg"
      >
        <NavLinks className="flex gap-12" isMobile={false} />
      </motion.div>
      {hamburger}
    </nav>
  );
}
