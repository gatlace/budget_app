import { useIsMobile } from "../hooks/useIsMobile"
import styles from "../styles/Header.module.scss"

const Header = () => {
    const isMobile = useIsMobile();
  return (
    <div className={styles.header}>
        <h1>Budget App</h1>
    </div>
  )
}

export default Header