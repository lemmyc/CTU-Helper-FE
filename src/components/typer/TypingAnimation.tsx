import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Tiết 9 bắt đầu lúc mấy giờ ?",
        1000,
        "Làm thế nào để xin điểm I ?",
        1000,
        "Chỉ tiêu tuyển sinh ngành Khoa học máy tính ?",
        1000,
        "Hồ sơ nhập học bao gồm những gì ?",
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: "48px", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
