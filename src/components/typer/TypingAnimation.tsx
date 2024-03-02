import { TypeAnimation } from "react-type-animation";
const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Tiết 9 bắt đầu lúc mấy giờ ?",
        1000,
        "Làm thế nào để nhận được điểm I ?",
        1000,
        "Chỉ tiêu tuyển sinh ngành Khoa học máy tính ?",
        1000,
        "Hồ sơ nhập học bao gồm những gì ?",
        1000,
      ]}
      wrapper="span"
      speed={68}
      style={{
        fontSize: "24px",
        display: "inline-block",
        textAlign: "center",
        pointerEvents: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
