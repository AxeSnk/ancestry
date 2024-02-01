import {tss} from "tss-react";

const ROOT_CLASS = "tree";
const useStyles = tss.create(() => {
  return {
    [`${ROOT_CLASS}`]: {
      "position": "relative",
      "display": "flex",
      "flexDirection": "column"
    }
  };
});

export default useStyles;
