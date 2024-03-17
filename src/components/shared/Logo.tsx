import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import routes from "../../config/routes";
function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Link
        to={`${routes.home}`}
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img src="logo-ctu.png" alt="Logo-CTU" width={"48px"} height={"48px"} />
        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            marginRight: "auto",
            fontWeight: "800",
            color: "#fff",
            textDecoration: "none",
            fontSize: "24px",
          }}
        >
          CTU-Helper
        </Typography>
      </Link>
    </div>
  );
}

export default Logo;
