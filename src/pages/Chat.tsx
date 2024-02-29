import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import { HiLightBulb } from "react-icons/hi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import ChatItem from "../components/chat/ChatItem";
import {
  deleteChats,
  getChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "USER" | "ASSISTANT";
  content: string;
};

function Chat() {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  const handleSubmit = async () => {
    if (!inputRef.current) return;
    const content = inputRef.current.value.trim() as string;
    inputRef.current.value = "";
    const newMessage: Message = {
      role: "USER",
      content,
    };
    setIsLoading(true)
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
    setIsLoading(false)

    // scrollToBottom();
  };
  const handleDeleteChats = async () => {
    try {
      toast.loading("Đang xóa dữ liệu hội thoại", {
        id: "deleteChats",
      });
      await deleteChats();
      setChatMessages([]);
      toast.success("Xóa hoàn tất", {
        id: "deleteChats",
      });
    } catch (error) {
      console.log(error);
      toast.success("Đã có lỗi trong quá trình tải", {
        id: "deleteChats",
      });
    }
  };
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Đang tải các đoạn hội thoại trước đó...", {
        id: "loadingChats",
      });
      getChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Tải hoàn tất", {
            id: "loadingChats",
          });
        })
        .catch((error) => {
          console.log(error);
          toast.success("Đã có lỗi trong quá trình tải", {
            id: "loadingChats",
          });
        });
    }
  }, [auth]);
  useLayoutEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        // maxHeight: "90"
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none",
          },
          flex: 0.2,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 3,
              p: 3,
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: 5,
            }}
          >
            <HiLightBulb
              style={{
                width: "64px",
                height: "64px",
              }}
            />
            <Typography
              sx={{
                my: 1,
              }}
            >
              Đây là giao diện trò chuyện với <strong>CTU-Helper</strong>. Hãy
              bắt đầu bằng một câu hỏi nhé !
              <br />
              <br />
              Các câu hỏi có thể liên quan đến{" "}
              <strong>
                Quy chế học vụ, Quyết định, Thông tin tuyển sinh,...
              </strong>
              &nbsp; nhưng không nên chứa các thông tin cá nhân.
            </Typography>
            <Button
              onClick={handleDeleteChats}
              sx={{
                width: "250px",
                my: 2,
                fontWeight: 600,
                bgcolor: red[700],
                color: "white",
                ":hover": {
                  bgcolor: red[300],
                },
              }}
            >
              Xóa dữ liệu cuộc trò chuyện
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: {
            md: 0.8,
            xs: 1,
            sm: 1,
          },
          flexDirection: "column",
          mx: 2,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            flex: 1,
            fontSize: {
              xs: "24px",
              lg: "40px",
            },
            mb: 2,
          }}
        >
          <strong>CTU-Helper</strong>&nbsp;&nbsp;Chat
        </Typography>
        <Box
          ref={chatContainerRef}
          sx={{
            width: "100%",
            height: {
                xs: "71vh",
                md: "74vh",
                // xl: "75vh"
              },
            // bgcolor: "red",
            // height: ,
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((message, index) => {
            return (
              <div key={message + index.toString()}>
                {
                  //@ts-ignore
                  <ChatItem
                    content={message.content}
                    role={message.role}
                  ></ChatItem>
                }
              </div>
            );
          })}
          <div style={{ display: isLoading ? "block" : "none" }}>
            <ChatItem
              content={"Bạn đợi mình suy nghĩ một chút nhé..."}
              role={"ASSISTANT"}
            ></ChatItem>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
          }}
        >
          <input
            type="text"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              padding: "10px",
              outline: "none",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          />
          <Button onClick={handleSubmit} variant="outlined">
            <IoPaperPlaneOutline size={24}></IoPaperPlaneOutline>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;
