import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
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
          borderRadius: '4px'
        }}
      >
        <Avatar
          sx={{
            ml: "0",
            bgcolor: "white",

          }}
        >
          <img src="bot.png" alt="bot" style={{
            width: "30px"
          }}/>
        </Avatar>
        <Box>
            <Typography>
                {content}
            </Typography>
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
          borderRadius: '4px',
          my: 1,
          gap: 2,
        }}
      >
        <Avatar
              sx={{
                ml: "0",
                bgcolor: "white",
                color: "#333"
              }}
            >
              {auth?.user?.name[0] || ""}
              {auth?.user?.name.split(" ").slice(-1)[0][0] || ""}
            </Avatar>
        <Box>
            <Typography
              sx={{
          color:  "#fff",

              }}
            >
                {content}
            </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ChatItem;
