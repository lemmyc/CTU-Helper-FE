import { Box, Typography } from '@mui/material'
import TypingAnimation from '../components/typer/TypingAnimation'
function Home() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography variant='h3'>
          <strong>CTU-Helper</strong>
        </Typography>
        <Typography  variant='h4'>
          Chatbot hỏi đáp những câu hỏi liên quan đến Đại học Cần Thơ
        </Typography>
        <TypingAnimation />
      </Box>
    </Box>
  )
}

export default Home