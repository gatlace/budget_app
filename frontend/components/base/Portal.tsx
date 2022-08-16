import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import styles from "styles/Components.module.scss";

interface PortalProps {
  children: React.ReactNode;
  onClose: () => void;
  styles?: string;
}

const Portal = (props: PortalProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  const portal = (
    <>
      <motion.div
        className={styles.portal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        onClick={handleClick}
      >
        <motion.div
          className={`${props.styles}`}
          id="portal-content"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {props.children}
        </motion.div>
      </motion.div>
    </>
  );

  if (typeof window === "undefined") {
    return null;
  } else {
    return createPortal(
      portal,
      document.getElementById("portals") as HTMLElement
    );
  }
};

export default Portal;
