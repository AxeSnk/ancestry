import lodash from "lodash";
import React, {memo} from "react";

import useStyles from "./TreeNode.styles";
import type {$TreeNodeProperties} from "./TreeNode.types";

const ROOT_CLASS = "tree-node";

function TreeNode(properties: $TreeNodeProperties): JSX.Element  {
  const hasChildren = properties.node.items && properties.node.items.length > 0;
  const paddingLeftOuter = `${(properties.level ?? 0) * 24 + (hasChildren ?  0 : 24)}px`;
  const {isExpandable = true} = properties;
  const {isSelectable = false} = properties;

  const handleTogglerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (isExpandable) {
      properties.isExpanded ? properties.onCollapseNode?.(properties.node) : properties.onExpandNode?.(properties.node);
    }
  };

  const handleNodeClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (isSelectable) {
      properties.isSelected ? properties.onUnselectNode?.(properties.node) : properties.onSelectNode?.(properties.node);
    }
  };

  // @ts-expect-error ...
  const {cx, classes} = useStyles();

  return (
    <div className={cx(classes[ROOT_CLASS], {
      [classes[`${ROOT_CLASS}--state-expanded`]]: (
        properties.isExpanded
      ),
      [classes[`${ROOT_CLASS}--state-selected`]]: (
        properties.isSelected
      ),
      [classes[`${ROOT_CLASS}--state-disabled`]]: (
        properties.isDisabled
      ),
      [classes[`${ROOT_CLASS}--state-crossed`]]: (
        properties.isCrossed
      ),
    })}
    >
      <div className={classes[`${ROOT_CLASS}__outer`]} style={{paddingLeft: paddingLeftOuter}}>
        <div className={classes[`${ROOT_CLASS}__inner`]}>
          <div className={classes[`${ROOT_CLASS}__prefix`]}>
            <div className={classes[`${ROOT_CLASS}__prefix-inner`]}>
              {
                hasChildren &&
                  <div className={classes[`${ROOT_CLASS}__icon`]}
                    data-name="toggler"
                    onClick={handleTogglerClick}
                  >
                    <div className={classes[`${ROOT_CLASS}__icon-inner`]}>
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2094 9.22595L12.987 12.0036L10.2094 14.7812C10.0753 14.915 10 15.0965 10 15.2859C10 15.4753 10.0753 15.6569 10.2094 15.7906C10.4886 16.0698 10.9396 16.0698 11.2188 15.7906L14.5047 12.5047C14.7839 12.2255 14.7839 11.7745 14.5047 11.4953L11.2188 8.2094C10.9396 7.9302 10.4886 7.9302 10.2094 8.2094C9.93735 8.48859 9.93019 8.94676 10.2094 9.22595Z"/>
                      </svg>
                    </div>
                  </div>
              }
              {
                !lodash.isNil(properties.iconRenderer) && (
                  (() => {
                    const icon = (
                      lodash.isFunction(properties.iconRenderer)
                        ? properties.iconRenderer()
                        : properties.iconRenderer
                    );

                    if (React.isValidElement(icon)) {
                      return (
                        <div className={classes[`${ROOT_CLASS}__icon`]}
                          data-name="type"
                          onClick={handleNodeClick}
                        >
                          <div className={classes[`${ROOT_CLASS}__icon-inner`]}>
                            {icon}
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })()
                )
              }
            </div>
          </div>

          {
            (!lodash.isNil(properties.labelRenderer) && (
              (() => {
                const label = (
                  lodash.isFunction(properties.labelRenderer)
                    ? properties.labelRenderer()
                    : properties.labelRenderer
                );

                return (
                  <div
                    className={classes[`${ROOT_CLASS}__label`]}
                    onClick={handleNodeClick}
                  >
                    <div className={classes[`${ROOT_CLASS}__label-inner`]}>
                      {label}
                    </div>
                  </div>
                );
              })()
            ) || (
              <div
                className={classes[`${ROOT_CLASS}__label`]}
                onClick={handleNodeClick}
              >
                <div className={classes[`${ROOT_CLASS}__label-inner`]}>
                  {properties.node.id}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default memo(TreeNode);
