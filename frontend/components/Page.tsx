import React, { PropsWithChildren } from 'react'
import { AnimatePresence } from 'framer-motion'
import styles from "styles/Page.module.scss"


const Page = ({ children }: PropsWithChildren) => {
  return (
    <AnimatePresence
        exitBeforeEnter={true}
    >
        <div className={styles.page}>
        {children}
        </div>
    </AnimatePresence>
  )
}

export default Page