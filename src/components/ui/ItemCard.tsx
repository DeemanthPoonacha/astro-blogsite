import { motion, MotionValue } from "framer-motion";

const ItemCard = ({
  item,
  translate,
}: {
  item: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate?: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={item.title}
      className="group/item h-96 w-[30rem] relative flex-shrink-0"
    >
      <a href={item.link} className="block group-hover/item:shadow-2xl ">
        <img
          src={item.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={item.title}
        />
        <div className="absolute inset-0 h-full w-full opacity-0 group-hover/item:opacity-80 bg-black pointer-events-none"></div>
        <h2 className="text-2xl uppercase absolute bottom-4 left-4 opacity-0 group-hover/item:opacity-100 text-white">
          {item.title}
        </h2>
      </a>
    </motion.div>
  );
};
export default ItemCard;
