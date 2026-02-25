const EnterKey = ({ onClick, pressed, imgSrc, altText }) => {
  return (
    <img
      src={imgSrc}
      alt={altText || "enter"}
      onClick={onClick}
      className={`enter-key ${pressed ? "pressed" : ""}`}
    />
  );
};

export default EnterKey;
