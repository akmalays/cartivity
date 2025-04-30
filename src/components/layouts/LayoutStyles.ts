import { StylesSxProps } from '../../types/elements';

const baseButtonStyle = {
  textTransform: "none",
  px: 1.5,
  fontSize: 12,
  backgroundColor: "white",
  color: "#333333",
  fontWeight: "medium",
  cursor: "pointer",
  borderRadius: "10px",
  border: "1px solid #999999",
};

export const LayoutStyles: StylesSxProps = {
  actionButton: {
    ...baseButtonStyle,
    "&:hover": {
      backgroundColor: "black",
      color: "white",
      border: "1px solid black",
    },
  },
  actionButtonNoHover: {
    ...baseButtonStyle,
    backgroundColor: "black",
    color: "white",
  },
  OkButton: {
    ...baseButtonStyle,
    "&:hover": {
      backgroundColor: "#e8f5e9",
      color: "#388e3c",
      border: "1px solid #388e3c",
    },
  },
  EditButton: {
    ...baseButtonStyle,
    "&:hover": {
      backgroundColor: "#f57c00",
      color: "white",
      border: "1px solid #f57c00",
    },
  },
  shopCategoryButton: {
    ...baseButtonStyle,
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
      border: "1px solid #999999",
    },
  },
  shopCategoryActiveButton: {
    ...baseButtonStyle,
    backgroundColor: "black",
    color: "white",
  },
};
