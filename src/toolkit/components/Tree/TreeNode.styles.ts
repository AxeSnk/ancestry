

import {tss, keyframes} from "tss-react";

export const ROOT_CLASS = "tree-node";
const useStyles = tss
.withName("tree-node")
.withNestedSelectors<any>()
.create(({ classes }) => {
  return {
    [`${ROOT_CLASS}`]: {
      "userSelect": "none",

      [`&:not(.${classes[`${ROOT_CLASS}--state-disabled`]})`]: {
        [`&.${classes[`${ROOT_CLASS}--state-selected`]}`]: {
          [`&:not(.${classes[`${ROOT_CLASS}--state-expanded`]})`]: {
            [`& .${classes[`${ROOT_CLASS}__outer`]}`]: {
              "&:hover, &:focus": {
                [`& .${classes[`${ROOT_CLASS}__icon`]}`]: {
                  "&[data-name='toggler']": {
                    [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
                      "fill": "rgba(255, 255, 255, 1)"
                    }
                  }
                }
              }
            }
          }
        },
        [`&:not(.${classes[`${ROOT_CLASS}--state-selected`]})`]: {
          [`& .${classes[`${ROOT_CLASS}__outer`]}`]: {
            "&:hover, &:focus": {
              "backgroundColor": "rgba(0, 5, 100, 0.04)"
            }
          },
          [`&:not(.${classes[`${ROOT_CLASS}--state-expanded`]})`]: {
            [`& .${classes[`${ROOT_CLASS}__outer`]}`]: {
              "&:hover, &:focus": {
                [`& .${classes[`${ROOT_CLASS}__icon`]}`]: {
                  "&[data-name='toggler']": {
                    [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
                      "fill": "rgba(0, 0, 61, 0.5)"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    [`${ROOT_CLASS}--state-selected`]: {
      [`& .${classes[`${ROOT_CLASS}__outer`]}`]: {
        "backgroundColor": "rgba(76, 94, 207, 1)"
      },
      [`& .${classes[`${ROOT_CLASS}__label-inner`]}`]: {
        "color": "rgba(255, 255, 255, 1)"
      },
      [`& .${classes[`${ROOT_CLASS}__icon`]}`]: {
        "&[data-name='toggler']": {
          [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
            "fill": "rgba(255, 255, 255, 0.5)"
          }
        },
        [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
          "fill": "rgba(255, 255, 255, 1)"
        }
      }
    },
    [`${ROOT_CLASS}--state-disabled`]: {
      [`&:not(.${classes[`${ROOT_CLASS}--state-crossed`]})`]: {
        [`& .${classes[`${ROOT_CLASS}__outer`]}`]: {
          "opacity": "0.4",
          "cursor": "not-allowed"
        }
      },
      [`&.${classes[`${ROOT_CLASS}--state-crossed`]}`]: {
        [`& .${classes["tree-node__outer"]}`]: {
          "&:hover, &:focus": {
            "backgroundColor": "rgba(217, 87, 94, 0.11)"
          }
        }
      },
      [`& .${classes[`${ROOT_CLASS}__inner`]}`]: {
        "pointerEvents": "none"
      }
    },
    [`${ROOT_CLASS}--state-expanded`]: {
      [`&.${classes[`${ROOT_CLASS}--state-selected`]}`]: {
        [`& .${classes[`${ROOT_CLASS}__icon`]}`]: {
          "&[data-name='toggler']": {
            [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
              "fill": "rgba(255, 255, 255, 1)"
            }
          }
        }
      },
      [`&:not(.${classes[`${ROOT_CLASS}--state-selected`]})`]: {
        [`& .${classes[`${ROOT_CLASS}__icon`]}`]: {
          "&[data-name='toggler']": {
            [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
              "fill": "rgba(0, 0, 61, 1)"
            }
          }
        }
      },
      [`& .${classes[`${ROOT_CLASS}__icon`]}`]: {
        "&[data-name='toggler']": {
          [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
            "transform": "rotate(90deg)"
          }
        }
      }
    },
    [`${ROOT_CLASS}--state-loading`]: {
      [`& .${classes[`${ROOT_CLASS}__icon`]}`]: {
        "&[data-name='toggler']": {
          [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
            "animation": `${keyframes`
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            `} 1.6s linear infinite`
          }
        }
      }
    },
    [`${ROOT_CLASS}--state-crossed`]: {
      [`& .${classes[`${ROOT_CLASS}__icon`]}`]: {
        "&[data-name='type']": {
          "pointerEvents": "none"
        }
      },
      [`& .${classes[`${ROOT_CLASS}__label`]}`]: {
        "pointerEvents": "none"
      },
      [`& .${classes[`${ROOT_CLASS}__label-inner`]}`]: {
        "color": "rgba(0, 0, 61, 0.3)",
        "textDecoration": "line-through"
      }
    },
    [`${ROOT_CLASS}__outer`]: {
      "position": "relative",
      "padding": "6px 4px",
      "borderRadius": "4px",
      "transition": `
        background-color 0.2s ease-in-out,
        opacity 0.2s ease-in-out
      `
    },
    [`${ROOT_CLASS}__inner`]: {
      "position": "relative",
      "display": "flex",
      "alignItems": "flex-start"
    },
    [`${ROOT_CLASS}__prefix`]: {},
    [`${ROOT_CLASS}__prefix-inner`]: {
      "position": "relative",
      "display": "flex",
      "alignItems": "center"
    },
    [`${ROOT_CLASS}__suffix`]: {
      "flex": "0 0 24px"
    },
    [`${ROOT_CLASS}__suffix-inner`]: {
      "position": "relative",
      "display": "flex",
      "alignItems": "center"
    },
    [`${ROOT_CLASS}__icon`]: {
      "flex": "0 0 24px",

      "&[data-name='toggler']": {
        [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
          "fill": "rgba(0, 0, 61, 0.25)"
        }
      },
      "&[data-name='type']": {
        "&:not([data-root='true'])": {
          [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
            "backgroundColor": "rgba(0, 0, 61, 0.05)"
          }
        },
        [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
          "fill": "rgba(53, 59, 96, 1)"
        }
      },
      "&[data-name='selected']": {
        [`& .${classes[`${ROOT_CLASS}__icon-inner`]}`]: {
          "fill": "rgba(76, 94, 207, 1)"
        }
      }
    },
    [`${ROOT_CLASS}__icon-inner`]: {
      "position": "relative",
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "width": "24px",
      "height": "24px",
      "borderRadius": "4px",
      "transition": `
        fill 0.2s ease-in-out,
        background-color 0.2s ease-in-out,
        transform 0.2s ease-in-out
      `,

      "&:not(:empty)": {
        "cursor": "pointer"
      }
    },
    [`${ROOT_CLASS}__label`]: {
      "flex": "1 1 auto"
    },
    [`${ROOT_CLASS}__label-inner`]: {
      "position": "relative",
      "padding": "0 8px",
      "color": "rgba(0, 3, 53, 1)",
      "fontSize": "14px",
      "fontWeight": "400",
      "fontStyle": "normal",
      "lineHeight": "24px",
      "letterSpacing": "0.1px",
      "transition": "color 0.2s ease-in-out",
      "cursor": "pointer"
    }
  };
});

export default useStyles;
