import { Box, Typography } from "@mui/material";
import TypingAnimation from "../components/typer/TypingAnimation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";


function Home() {
  const auth = useAuth();

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h3" marginY={2}>
            Chào mừng <strong>{auth?.user?.name || "bạn"}</strong> đến với <strong>CTU-Helper</strong>
          </Typography>
          <Typography variant="h4">
            Chatbot hỏi đáp những câu hỏi liên quan đến <strong>Trường Đại học Cần Thơ</strong>
          </Typography>
        </Box>
        <Box my={2}>
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
        <BiSolidQuoteAltRight
          style={{
            width: "64px",
            height: "64px",
          }}
        />
        <TypingAnimation />
      </Box>
    </Box>
  );
}

export default Home;
