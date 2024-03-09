import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Box, Typography, Button } from "@mui/material";
import { red } from "@mui/material/colors";

import { HiLightBulb, HiQuestionMarkCircle } from "react-icons/hi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";

import toast from "react-hot-toast";

import { grid } from "ldrs";

grid.register();

import ChatItem from "../components/chat/ChatItem";
import { useAuth } from "../context/AuthContext";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showHelperBox, setShowHelperBox] = useState<boolean>(false);
  const [alwaysShowHelperBox, setAlwaysShowHelperBox] =
    useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  const handleSubmit = async () => {
    if (!inputRef.current || !inputRef.current.value.trim()) {
      toast.error("Vui lòng nhập thông tin cần hỏi", {
        id: "submit-toast",
      });
      return;
    }
    if (isLoading) {
      toast.error("Hệ thống đang xử lý câu hỏi trước đó, vui lòng đợi", {
        id: "submit-toast",
      });
      return;
    }
    const content = inputRef.current.value.trim() as string;
    inputRef.current.value = "";
    const newMessage: Message = {
      role: "USER",
      content,
    };
    setIsLoading(true);
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
    setIsLoading(false);
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
      setShowHelperBox(false);
    } catch (error) {
      console.log(error);
      toast.success("Đã có lỗi trong quá trình tải", {
        id: "deleteChats",
      });
    }
  };

  const navigate = useNavigate();

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

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
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        setAlwaysShowHelperBox(true);
      } else {
        setAlwaysShowHelperBox(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (transcript) {
      inputRef.current.value = transcript;
    }
  }, [transcript]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "calc(100vh - 64px)",
        boxSizing: "border-box",
        pt: 2,
        px: 2,
        pb: 1,
        gap: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: showHelperBox || alwaysShowHelperBox ? "flex" : "none",
          position: alwaysShowHelperBox ? "relative" : "absolute",
          zIndex: 999,
          top: 0,
          left: 0,
          flex: 0.2,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              backgroundColor: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: 5,
              position: "relative",
              m: 1,
            }}
          >
            <HiLightBulb
              style={{
                width: "64px",
                height: "64px",
              }}
            />
            <Button
              onClick={() => setShowHelperBox((prev) => !prev)}
              sx={{
                display: { xs: "block", sm: "block", md: "none" },
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                position: "absolute",
                top: 0,
                right: 0,
                fontSize: "1.25rem",
                color: "#333",
              }}
            >
              <IoIosCloseCircle />
            </Button>
            <Typography
              sx={{
                my: 1,
              }}
            >
              Đây là giao diện trò chuyện với <strong>CTU-Helper</strong>. Hãy
              bắt đầu bằng một câu hỏi nhé !
              <br />
              <br />
              Các câu hỏi có thể liên quan đến &nbsp;
              <strong>
                Quy chế học vụ, Quyết định, Thông tin tuyển sinh,...
              </strong>
              &nbsp; nhưng không nên chứa các thông tin cá nhân.
            </Typography>
            {chatMessages?.length > 0 && (
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
            )}
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <Button
            onClick={() => setShowHelperBox((prev) => !prev)}
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              fontSize: "1.25rem",
              color: "#333",
            }}
          >
            <HiQuestionMarkCircle />
          </Button>
          <Typography
            sx={{
              flex: 1,
              textAlign: "center",
              fontSize: {
                xs: "24px",
                lg: "40px",
              },
            }}
          >
            <strong>CTU-Helper</strong>&nbsp;&nbsp;Chat
          </Typography>
        </Box>
        <Box
          ref={chatContainerRef}
          sx={{
            width: "100%",
            maxHeight: "calc(100vh - 220px)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            "::-webkit-scrollbar": {
              width: "4px",
            },
            "::-webkit-scrollbar-track": {
              borderColor: "#f1f1f1",
            },
            "::-webkit-scrollbar-thumb": {
              bgcolor: "#aaa",
              borderRadius: "6px",
            },
          }}
        >
          {chatMessages?.length == 0 && (
            <Typography
              sx={{
                color: "#555",
                textAlign: "center",
                verticalAlign: "center",
                fontStyle: "italic",
                marginY: "auto",
              }}
            >
              Hãy bắt đầu với một câu hỏi nhé...
            </Typography>
          )}
          {chatMessages.map((message, index) => {
            return (
              <div key={message + index.toString()}>
                {
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
              content={"Bạn đợi mình tìm kiếm các thông tin một chút nhé"}
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
            placeholder="Hỏi CTU-Helper..."
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
          {browserSupportsSpeechRecognition ? (
            <>
              {!listening ? (
                <Button
                  onClick={() => {
                    SpeechRecognition.startListening({ language: "vi-VN" });
                  }}
                  variant="outlined"
                >
                  <CiMicrophoneOn size={24} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    SpeechRecognition.stopListening();
                  }}
                  variant="outlined"
                  color="error"
                >
                  <CiMicrophoneOff size={24} />
                </Button>
              )}
            </>
          ) : (
            <></>
          )}
          <Button onClick={handleSubmit} variant="outlined">
            <IoPaperPlaneOutline size={24}></IoPaperPlaneOutline>
          </Button>
        </Box>
        <Typography
          sx={{
            mt: 0.5,
            ml: 1,
            fontSize: "0.75rem",
            fontStyle: "italic",
          }}
        >
          Chatbot đôi khi sẽ đưa ra các thông tin không chính xác hoặc kì lạ.
          Hãy xác nhận lại với Trường nếu cần thiết.
        </Typography>
      </Box>
    </Box>
  );
}

export default Chat;
