import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  size?: number;
  styleButton?: React.CSSProperties;
  textButton: string;
  styleTextButton?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  size = 16,
  styleButton,
  textButton,
  styleTextButton,
}) => {
  
  const buttonStyle: React.CSSProperties = {
    ...styleButton,
    fontSize: size,
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      <span style={styleTextButton}>{textButton}</span>
    </button>
  );
};

export default CustomButton;
