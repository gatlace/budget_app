import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import styles from "styles/Components.module.scss";
import React from "react";

interface PortalProps {
  children: React.ReactNode;
  onClose: () => void;
  styles?: string;
}

const Portal = (props: PortalProps) => {
  

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target ! instanceof Element && e.target.id === "portal") {
        props.onClose();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    }

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    }
  }), [props.onClose];

  const portal = (
    <>
      <motion.div
        className={styles.portal}
        id="portal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className={`${props.styles}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.1 }}
          tabIndex={0}
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
