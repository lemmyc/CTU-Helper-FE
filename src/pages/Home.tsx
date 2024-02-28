import { Box, Typography, Button } from "@mui/material";
import TypingAnimation from "../components/typer/TypingAnimation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { IoMdQuote } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Home() {
  const auth = useAuth();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        width: {
          xs: "348px",
          sm: "496px",
          md: "559px",
          lg: "664px",
          xl: "780px",
        },
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto"
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: { xs: "0.5rem", xl: "1rem" },
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: { xs: "18px", xl: "24px" },
            }}
          >
            Chào mừng
          </Typography>
          <Typography
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: { xs: "18px", xl: "24px" },
            }}
          >
            {auth?.user ? auth?.user?.name : "bạn"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: { xs: "2rem", md: "3rem", xl: "4rem" },
          }}
        >
          <Typography
            sx={{
              color: "#1976d2",
              textTransform: "uppercase",
              fontSize: {
                xs: "150px",
                sm: "220px",
                md: "250px",
                lg: "300px",
                xl: "350px",
              },
              lineHeight: ".6",
              fontFamily: "right-grotesk-tall-bold",
            }}
          >
            CTU-HELPER
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontStyle: "italic",
              color: "#1976d2",
              fontWeight: "bold",
              fontSize: { xs: "16px", xl: "18px" },
              display: { xs: "inline-block", md: "block" },
            }}
          >
            Chatbot
          </Typography>
          <Typography
            sx={{
              display: { xs: "inline-block", md: "block" },
              fontSize: { xs: "16px", xl: "18px" },
            }}
          >
            &nbsp;hỏi đáp
          </Typography>
          <Typography
            sx={{
              display: { xs: "inline-block", md: "block" },
              fontSize: { xs: "16px", xl: "18px" },
            }}
          >
            &nbsp;
          </Typography>
          <Box
            sx={{
              flexGrow: "1",
              height: "1px",
              backgroundColor: "#333",
              display: { xs: "none", md: "block" },
            }}
          ></Box>
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              fontSize: { xs: "16px", xl: "18px" },
            }}
          >
            &nbsp;
          </Typography>
          <Typography
            sx={{
              display: { xs: "inline-block", md: "block" },
              fontSize: { xs: "16px", xl: "18px" },
            }}
          >
            những câu hỏi liên quan đến&nbsp;
          </Typography>
          <Typography
            sx={{
              fontStyle: "italic",
              color: "#1976d2",
              fontWeight: "bold",
              display: { xs: "inline-block", md: "block" },
              fontSize: { xs: "16px", xl: "18px" },
            }}
          >
            Trường đại học Cần Thơ
          </Typography>
        </Box>
        <Box sx={{ marginY: "1rem", borderRadius: { xs: "12px", md: "38px", xl: "40px" }, overflow: "hidden" }}>
          <Carousel
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            emulateTouch={true}
            infiniteLoop={true}
          >
            <div>
              <img src="dukientuyensinh.png" alt="dukientuyensinh" />
            </div>
            <div>
              <img src="dukientuyensinh.png" alt="dukientuyensinh" />
            </div>
            <div>
              <img src="dukientuyensinh.png" alt="dukientuyensinh" />
            </div>
          </Carousel>
        </Box>
        <Link to="/chat">
          <Button
            sx={{
              width: { xs: "200px", md: "250px", xl: "280px" },
              paddingY: { xs: "4px", md: "6px", xl: "8px" },
              my: 1,
              fontWeight: 600,
              fontSize: { xs: "16px", md: "16px", xl: "18px" },
              color: "#fff",
              bgcolor: "#1976d2",
              ":hover": {
                bgcolor: "#197fff",
              },
            }}
          >
            Bắt đầu Hỏi/ Đáp &nbsp;&nbsp;&nbsp;&nbsp;
            <FaArrowRightLong />
          </Button>
        </Link>
        <IoMdQuote
          style={{
            width: "32px",
            height: "32px",
          }}
        />
        <TypingAnimation />
      </Box>
    </Box>
  );
}

export default Home;
