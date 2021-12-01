import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  searchRoot: {
    display: "flex",
    position: "relative",
    marginBottom: theme.spacing(2),
    height: 40,
  },

  searchFieldBox: {
    flexGrow: 1,
    position: "relative",
    marginRight: theme.spacing(2),
    height: "100%",
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    "& input": {
      outline: "none",
      border: "none",
      height: "100%",
      width: "100%",
      padding: theme.spacing(1),
      boxShadow: "inset 0 1px 3px 0 rgb(0 0 0 / 20%)",
    },
  },

  searchSubmitBtn: {
    width: 100,
  },

  titleBox: {
    display: "none",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: theme.spacing(1),
    background: "#ccc",
    "& p": {
      flexGrow: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& button": {
      marginLeft: theme.spacing(1),
    },
  },
  titleBox_show: {
    display: "flex",
  },

  mapRoot: {
    position: "relative",
  },

  placemark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -100%)",
    zIndex: 1200,
    fontSize: "35px !important",
    cursor: "grab",
  },
}));
