import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";



import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import toast, {} from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import routes from "../config/routes";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Đang đăng nhập...", {
        id: "login-toast"
      })
      await auth?.login(email, password);
      toast.success("Đăng nhập thành công", {
        id: "login-toast"
      })
    } catch (error) {
      toast.error("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập", {
        id: "login-toast"
      })
    }
  }
  useEffect(() => {
    if (auth?.user) {
      return navigate(routes.chat);
    }
  }, [auth]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flex: "1",
        alignItems: "center",
        justifyContent: "space-around"
      }}
    >
      {/* <Box
        padding={8}
        marginTop={8}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img
          style={{
            mixBlendMode: "multiply",
            width: "320px",
            pointerEvents: "none",
          }}
          src="chatbot.gif"
          alt="Chatbot"
        />
      </Box> */}
      <Box
        display={"flex"}
        // flex={{ xs: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          mt: 5, 
          mx: 5
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "1.5rem",
            boxShadow: "6px 12px 16px #bbb",
            borderRadius: "8px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              margin={2}
              fontWeight={600}
              sx={{
                fontSize: {
                  xs: "18px",
                  md: "24px"
                }
              }}
            >
              Đăng nhập vào CTU-Helper
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Mật Khẩu" />
            <Typography sx={{
                fontSize: {
                  xs: "15px",
                  md: "18px"
                }
              }}>
              Chưa có tài khoản?&nbsp;
              <Link to={`${routes.signup}`}>Đăng ký ngay</Link>
            </Typography>
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: {
                    xs: "280px",
                    sm: "500px",
                    md: "600px",
                  },
                borderRadius: "8px",
              }}
            >
              Đăng nhập
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
