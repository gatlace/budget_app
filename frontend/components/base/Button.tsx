import React, { MouseEventHandler } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick: MouseEventHandler;
};

const Button = (props: Props) => {
  const defaultClassName = "button";
  return (
  <AnimatePresence>
    <motion.button
      className={props.className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
      onClick={props.onClick}
    >
      {props.children}
    </motion.button>

  </AnimatePresence>
  );
};

export default Button;
