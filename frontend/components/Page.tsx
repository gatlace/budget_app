import React, { PropsWithChildren } from "react";
import styles from "styles/Page.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const Page = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      <motion.div
        key={router.pathname}
        className={styles.pageContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Page;
