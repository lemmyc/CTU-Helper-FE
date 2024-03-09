import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import Markdown from "marked-react";
function ChatItem({
  content,
  role,
}: {
  content: string;
  role: "USER" | "ASSISTANT";
}) {
  const auth = useAuth();
  return role === "ASSISTANT" ? (
    <>
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "#fff",
          my: 1,
          gap: 2,
          borderRadius: "4px",
        }}
      >
        <Avatar
          sx={{
            ml: "0",
            bgcolor: "white",
            mt: ".5rem",
          }}
        >
          <img
            src="bot.png"
            alt="bot"
            style={{
              width: "30px",
            }}
          />
        </Avatar>
        <Box>
          {content === "Bạn đợi mình tìm kiếm các thông tin một chút nhé" ? (
            <>
              <Typography sx={{marginBottom: "4px"}}>{content}</Typography>
              <l-grid size="28" speed="1" color="black"></l-grid>
            </>
          ) : (
            <Typography>
              <Markdown>{content}</Markdown>
            </Typography>
          )}
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "#3498db",
          borderRadius: "4px",
          my: 1,
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            ml: "0",
            bgcolor: "white",
            color: "#333",
            mt: ".5rem",
          }}
        >
          {auth?.user?.name[0] || ""}
          {auth?.user?.name.split(" ").slice(-1)[0][0] || ""}
        </Avatar>
        <Box>
          <Typography
            sx={{
              color: "#fff",
            }}
          >
            <Markdown>{content}</Markdown>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ChatItem;
