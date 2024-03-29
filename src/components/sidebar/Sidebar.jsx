import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { S, G, getUser, getBearerToken } from "../../Services/axios";
import { LayoutContext } from "../layout/LayoutContext";
// import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import HamImg from "../../Images/Hamburger.png"

const sidebarNavItems = [
  {
    display: "Home",
    icon: <i className="bx bx-home"></i>,
    to: "/user/home",
    section: "home",
  },
  {
    display: "Profile",
    icon: <i className="bx bx-user"></i>,
    to: "/user/user-profile",
    section: "user-profile",
  },
  {
    display: "Restaurants",
    icon: <i className="bx bx-restaurant"></i>,
    to: "/user/restaurant",
    section: "restaurant",
  },
  {
    display: "Orders",
    icon: <i className="bx bx-receipt"></i>,
    to: "/user/orders",
    section: "orders",
  },
];
const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const {cssClass, setCssClass} = useContext(LayoutContext) ;
  const [closeSide , setCloseSide] = useState(false)
  const [navbarOpen, setNavbarOpen] = useState(true);
  const [user, setUser] = useState({ name: "Guest", img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAbFBMVEVGRkb///9DQ0M8PDw5OTk/Pz9AQEA2NjY0NDTu7u78/PzS0tL09PTJycmdnZ1JSUnh4eG1tbVOTk5kZGTp6enDw8OsrKwuLi6MjIx7e3uWlpbOzs66urqmpqZVVVVsbGxdXV1ra2uDg4N9fX0BXUZmAAAHVUlEQVR4nO2diXqqMBBGyUJYREFxQxGtff93vCy1VVuUTCZ10st5AD9+k8waBs8bGRkZGRkZGRkZGRkZGRkZGRkZGRkZGfnf4MqXMmyRUij+6udBhSuRVsV2XWYt5Xp2rFIh/opIX6RFmcXshjia7qq/oJGL4DxlPWSzRahe/YRGcLmYRX3yWqZF4LBEnh6Sh/KavTo5Ckcl8mC7fCavW8XcybMoqmyQvIa557/6cXWpl2+wvJrlm3j1E+vB+VxHX82Mu7RNOZ9o6mNs77lja9RimHW5JatcOYiqguhjLDq6cRDVabj5vCUp5KsffgDcg+prFDpgaUJ9+/JFvCBvaYKVgb7aIS6Ir6E4G+mrbSltU6ryp9H1M8rg1SIeIfem+hjbEj6GYmeurzY0ZI8hV4+z24HsyQoUuhF2D1uiEQ1f4OhjUUVzDUMzF3gFTUvKT8Yu4pMTxSWUazR9bEUy6kYxoR+80XOGvlYR5hkElzBECGKuIHcKMU1Mw5raEqJEaVcsXy3oHt7bYgFyJpY3bZD1sRUtZ8/fsAXGtKyMRIqzr9iS2qMK10k0zEkJTOG1wj4iSo6CV/HzJ9YlJ3QK8W0Mo3UIcQPRD1aEEntxsCAwIyTQgpdgLCFUuQiwA7UWSgJNOi69HOlkvXYEzugcQmlFIKGcUOEHMjVzOgLtbNEJnYxpFOi6QFn+dYGIVW2SAq3EopQEWskmKAnkJxsCp4QEVrh17Q5Cjt5GTYaxA51Y1BM28iVKNQsxsyDwz1edCCW8dbCGry9KXy3qGguHcEonoffw+4OMVL7rNbeA0D3hO6kVRLloeEtKycZYcBQTUju0CUcx78kwUjW1Dryrai0xJTffwnNUgYRypQspamGG3A6ts94CUV9E7qpTjUTMmeb0FrBeQtOXJq4gZ2Ja8LpoU0Kp4BXqiCUwpxWmfYJ1774kFsV8wj3Yu5F3xKRS3RtwXMWB6gJ6OEX8jOz6NWzM45mCpgn9wDyrIBik3SAKs3tre7pvn32gjAxNRteCfmJSgEpy0gfwAwlWGBfED+AHEtgvjGkb0CtglsYdfU3crR+0uTLMosP3dD3+xJlxJB081DM1ZUo0RerHz4cv4rKQ9P3fNxTfDYzb5gu3tucngh8GmNPJ0cnBYx3SOzyxp3tnR8d1cOWdp307Nc7mJ99peS2+PJ3L5FsDMcnWx9QJ28KFELKh11FzP0jz3WGVdds1Xmbl7L0KH+xNodofJDCiU8kwn03bB5/s+INYhPtChuGmJQwfj4kVfNa6mOV0lj/6G6zDBS/m0ZehjLYBwj9exwhfhzaOZsf0RevI67W7n/1ams/w495dqzHOdosXLKMv89UPNw8mpj7bX/zQxElWufjdWECobU8zKcuNypryrcenTM7hr2UbXPIHs22TLdz282DbH/osZ/xXvAoPTuvHMeYcmhmo9PH19uRgf5wsF4vV0xB6X4EUyvxpDzVaLXyrEoUa1EGKtxvtx+DhoLs2yYHbMzf1ERlauJ4uNE2CPA1NHyNrySPn5fBiUrRLNf5pXz0ZyX3D3LOj8CcP9YBJMdQ9K1Fo/rSNOZaq0u6r7HM54EFUeNTuSUX4CgH6alZvmycbVYQF5PJCdkJWyDX354V4cvb6B9qrgO/uw9mhCpHbUBJ+R2RZHn/6vkSdRnpFCW8nTkNMfb7ZfdDldFdJ4Utf8Zrm8yEqqHa9pYxh7BA3KcrbSfv5/Pye17zv1iXG1T3ET6vYGQVgCt74NbOurT3QrrTZeUnXnCnSEqqjhYE4GGBdfLYybQQFpLdHONEFrCM2FH12XtHFAeUlQ5+oiWnAGIzEq1ereASClaG8QxkrzOM1gzD7FyiN9ygH5YG/xtL4RVG8q+Z2MH6FxM6gCjyMHYWVd+QRMT+EpI8gY5nhISQbaF9IDA+hhferkTGcd2xnnBEmhlNLNsSPYH0IDVMmG6NiUEmM5FGtxlyRGE15tDJIBRkjV++TrVZ8YTQ6yMIEbXSMpltJ4m6+ITJYQZ6++umHYDDXg3qu1GFQHXXBiDK2g+9R+oFag0H51870XmxW8C1qZeQdOvCh6naGFqIDn1BmZ+wkPuD7CA6E2i3gcJt6Re0CONym2xi8BewnqLau7wF/pUk44SUYmwC3KPG2xBfQBgX2N+msAf26iCtegsVvMIGYY6jsAmyDuuIG64QJZmVccYNgRxg4UHHqAF7LCx3xEnXCBLscKx3xErUjBGWEjmSDDTBHqI7uCAR1Qd1xg0BH6EbNsAOUEbrj54HDylzoLF0AeXrhSLrbAPL0gTN+HujpXWidXUg2AIHeq59agwSwRV2p+rZAQhln8vkWgKenfZX5HsCFLpcCGZCnl7jfH7AMwNO7k883lPpbVDkUyIC6vK7U7Tsy7RV0pm7foV+0cKhg0aAfytB+Zek7uvqcE6gdq7kVqQHuc7kmUDsYdStSAwSjLpWcGrQbTO60ljq0Lzbb+f6zPbSjbVeukFzQrqu5JlD7avookBj/r8B/6+OOffURIeIAAAAASUVORK5CYII=" });
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof G("token") !== "string") {
      // getBearerToken("amirdldr@gmail.com", "Amir1379").then((x) => {
      //   S("token", x.data.token);
      //   getUser().then((e) => {
      //     console.table(e.data);
      //   });
      // });
    } else {
      getUser().then((e) => {
        setUser({
          name: e.data.fullName,
          img: e.data.picture
        });
      });      
    }
    getUser().then((e) => {
      setLogin(true);
    }).catch(error=>{
      setLogin(false);
    });
    
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  useEffect(() => {
    
  }, [login]);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/user/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath,
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const handleToggle = () => {
    //setNavbarOpen(!navbarOpen);
    setCloseSide(!closeSide)
    setCssClass(!cssClass)
  };

  return (
    <div className="AllSidebar">
      <span
        className={`btn-open ${navbarOpen ? " hide-btn" : ""}`}
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
        >
          <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zM10 7l6 5-6 5V7z"></path>
        </svg>
      </span>
      <nav className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
        <div className={`sidebar__logo ${closeSide ? " hideSideLogoMember" : ""}`}>
          <div className={`LogoAndProf ${closeSide ? " hideMember" : ""}`}>
            <div className={`sideLogo ${closeSide ? " hideMember" : ""}`}>
              <img className="logo" src={user.img} alt=""/>
            </div>
            <div className={`profName ${closeSide ? " hideMember" : ""}`}>
              <div className="text_name">
                <p>{user.name}</p>
              </div>
            </div>
          </div>
          <img className={` ${closeSide ? " hambIcon" : "btn_close"}`} src={HamImg} onClick={handleToggle} />
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
          <div
            ref={indicatorRef}
            className="sidebar__menu__indicator"
            style={{
              transform: `translateX(-50%) translateY(${activeIndex * stepHeight
                }px)`,
            }}
          ></div>
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div className={`sidebar__menu__item ${activeIndex === index ? "active" : ""}`}>
                <div className={`sidebar__menu__item__icon ${closeSide ? " logoItemIcon" : ""}`} >{item.icon}</div>
                <div className={`sidebar__menu__item__text ${closeSide ? " hideMember" : ""}`}>{item.display}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="SignButton">
          {login ? <button className="SignOutButton" onClick={() => {localStorage.clear(); setLogin(false); navigate('/login')}}>Sign out</button> : <button className="SignInButton" onClick={()=> navigate('/login')}>LOGIN</button>}
          
          
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
