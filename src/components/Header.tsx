import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
function Header() {
  const auth = useAuth();
  const location = useLocation()?.pathname;
  return location.startsWith("/login") || location.startsWith("/sign-up") ? (
    <AppBar sx={{ position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Logo />
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar sx={{ position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" , alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                background="transparent"
                to="/"
                text="Đăng xuất"
                textColor="#fff"
                onClick={auth?.logout}
              ></NavigationLink>
            </>
          ) : (
            <>
              <NavigationLink
                background="#fff"
                to="/login"
                text="Đăng nhập"
                textColor="#333"

              ></NavigationLink>
              <NavigationLink
                background="transparent"
                to="/sign-up"
                text="Đăng ký"
                textColor="#fff"
                
              ></NavigationLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
