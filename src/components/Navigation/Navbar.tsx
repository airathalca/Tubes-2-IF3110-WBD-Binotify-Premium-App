import styles from "./Navbar.module.css";
import Logo from "../../assets/logo-light.svg";
import { ReactNode, useRef, useState, useEffect } from "react";

interface INavbarLink {
  icon: ReactNode;
  text: string;
  url: string;
}

const Navbar = ({ navbarLinks } : { navbarLinks: INavbarLink[] }) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const navLinksContainerRef = useRef<HTMLDivElement |  null>(null);
  const navLinksRef = useRef<HTMLDivElement |  null>(null);

  useEffect(() => {
    if (!isToggled) {
      navLinksContainerRef.current!.style.height = "0";
    } else {
      navLinksContainerRef.current!.style.height = `${navLinksRef.current!.getBoundingClientRect().height}px`;
    }
  }, [isToggled])

  return (
    <nav className={styles.nav}>
      <div className={styles.topSection}>
        <img src={Logo} alt="Binotify Logo" />
        <button className={isToggled ? styles.toggled : ""} onClick={() => setIsToggled(!isToggled)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="#ffffff"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </button>
      </div>
      <div className={styles.navLinksContainer} ref={navLinksContainerRef}>
        <div className={styles.navLinks} ref={navLinksRef}>
          {navbarLinks.map(({icon, text, url}) => {
            return <a href={url} className={styles.navLink}>
              {icon}  
              <p>{text}</p>
            </a>
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
