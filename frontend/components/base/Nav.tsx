import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Portal from "./Portal";
import Button from "./Button";
import styles from "styles/Components.module.scss";
import useIsLoggedIn from "hooks/useIsLoggedIn";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";

type Props = {
  links: Link[];
  loggedInLinks: Link[];
  icon: React.ReactNode;
  align: "start" | "end";

}

type Link = {
  name: string;
  func: () => void;
}

const Nav = (props: Props) => {
  const [ isMobileContext, setIsMobileContext ] = React.useState(false);
  const isLoggedIn = useIsLoggedIn();


  useEffect(() => {
    setIsMobileContext(isMobile);
  } , []);

  const final_links = isLoggedIn ? props.loggedInLinks : props.links;


  return (
    <>
      {!isMobileContext ? (
        <DesktopNav links={final_links}/>
      ) : (
        <NavButton links={final_links} icon={props.icon} align={props.align}/>
      )}
    </>
  );
};

const NavButton = (props: {links: Link[], icon: React.ReactNode, align: "start" | "end" }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => setIsOpen(false);


  return (
    <>
      <div className={"block w-full " + (props.align === "start" ? "text-start" : "text-end")}>
        <Button onClick={() => setIsOpen(true)}>
          {props.icon}
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Portal onClose={handleClose} styles={"absolute top-20 " + (props.align === "start" ? "left-4" : "right-4") }>
            <PortalNav links={props.links} onClose={handleClose} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

const PortalNav = (props: { links: { name: string, func: () => void}[], onClose: () => void }) => {
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();


  const navItems = props.links.map(({ name, func }, index) => (
    <button
      key={index}
      className={styles.navItem}
      onClick={() => {
        func();
        props.onClose();
      }}
    >
      {name}
    </button>
  ));
  return <div className={styles.portalNav}>{navItems}</div>;
};

const DesktopNav = (props: {links: Link[]}) => {

  const navItems = props.links? props.links.map(({ name, func }, index) => (
    <button
      key={index}
      className={styles.navItem}
      onClick={() => {
        func();
      }}
    >
      {name}
    </button>
  )) : [];

  return (
    <div className={`w-full flex justify-center`}>
      <div className={styles.desktopNav}>{navItems}</div>
    </div>
    )
};

export default Nav;
