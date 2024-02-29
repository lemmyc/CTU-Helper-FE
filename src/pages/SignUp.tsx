import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";



import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import toast, {} from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Đang đăng ký...", {
        id: "signup-toast"
      })
      await auth?.signup(name, email, password);
      toast.success("Đăng ký thành công", {
        id: "signup-toast"
      })
    } catch (error) {
      toast.error("Đăng ký thất bại, vui lòng kiểm tra lại thông tin đăng nhập", {
        id: "signup-toast"
      })
    }
  }
  useEffect(() => {
    if (auth?.user) {
      return navigate("/");
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
            padding: "30px",
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
              Đăng ký tài khoản tại CTU-Helper
            </Typography>
            <CustomizedInput type="text" name="name" label="Họ tên" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Mật Khẩu" />
            <Typography sx={{
                fontSize: {
                  xs: "15px",
                  md: "18px"
                }
              }}>
              Đã có tài khoản?&nbsp;
              <Link to={"/login"}>Đăng nhập ngay</Link>
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
              Đăng ký
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
