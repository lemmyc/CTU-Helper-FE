import React from "react";
import  { AxiosError } from 'axios';
import { Link } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";

import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import routes from "../config/routes";
import { dictionary } from "../helpers/dictionary";

interface LoginErrorResponse {
  cause: string;
  message: string;
}

function Login() {
  
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password)
      return toast.error("Thông tin đăng nhập không được để trống", {
        id: "login-toast",
      });
    if (password.length < 3)
      return toast.error("Mật khẩu phải dài tối thiểu là 3 kí tự", {
        id: "login-toast",
      });
    try {
      toast.loading("Đang đăng nhập...", {
        id: "login-toast",
      });
      await auth?.login(email, password);
      toast.success("Đăng nhập thành công", {
        id: "login-toast",
      });
    } catch (error) {
      const axiosError = error as AxiosError<LoginErrorResponse>;
      if (axiosError.response) {
        toast.error(dictionary[axiosError.response.data.cause as keyof typeof dictionary], {
          id: "login-toast",
        });
      } else if (axiosError.request) {
        toast.error("Lỗi trong quá trình gửi yêu cầu", {
          id: "login-toast",
        });
      } else {
        toast.error("Lỗi không xác định", {
          id: "login-toast",
        });
      }
    }
  };
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
        justifyContent: "space-around",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          mt: 5,
          mx: 5,
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
                  md: "24px",
                },
              }}
            >
              Đăng nhập vào CTU-Helper
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Mật Khẩu"/>
            <Typography
              sx={{
                fontSize: {
                  xs: "15px",
                  md: "18px",
                },
              }}
            >
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
