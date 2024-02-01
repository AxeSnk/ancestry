import lodash from "lodash";
import React from "react";

import useStyles from "./Tree.styles";
import type {$TreeProperties} from "./Tree.types";
import type {$TreeNodeData, $TreeNodeId, $TreeNodeList} from "./TreeNode.types";
import TreeNode from "./TreeNode.component";

function Tree(properties: $TreeProperties): JSX.Element {
  const [$$expandedNodeIdentifiers, setExpandedNodeIdentifiers] = React.useState<Array<string>>(() => {
    return properties.expandedNodeIdentifiers ?? properties.defaultExpandedNodeIdentifiers ?? [];
  });
  const [$$selectedNodeIdentifiers, setSelectedNodeIdentifiers] = React.useState<Array<string>>(() => {
    return properties.selectedNodeIdentifiers ?? properties.defaultSelectedNodeIdentifiers ?? [];
  });

  const fieldNames = {
    id: properties.nodes.extractors?.identifier || "id",
    parentId: properties.nodes.extractors?.parentIdentifier || "parentId",
    items: properties.nodes.extractors?.objectsIdentifier || "items",
  };

  function filterAndSortData(data: $TreeNodeList) {
    let newData = data;

    newData = properties.filter?.(newData) ?? newData;
    newData = properties.sort?.(newData) ?? newData;

    return newData;
  }

  function convertNestData(data: $TreeNodeList) {
    const map: Map<$TreeNodeId, $TreeNodeData> = new Map();
    const output: Array<$TreeNodeData> = [];

    function digData(nodeList: $TreeNodeList, parentId: $TreeNodeId | null) {
      const _data = filterAndSortData(nodeList);

      _data.forEach((item) => {
        const parent = map.get(parentId ?? "");
        const hasChildren = item[fieldNames.items] && item[fieldNames.items].length > 0;
  
        map.set(item[fieldNames.id], {
          ...item,
          id: item[fieldNames.id],
          parentId: parentId,
          items: []
        });

        const mapItem = map.get(item[fieldNames.id]);

        if (mapItem) {
          if (parent) {
            parent?.items?.push(mapItem);
          } else {
            output.push(mapItem);
          }  
        }

        if (hasChildren) {
          digData(item[fieldNames.items], item[fieldNames.id]);
        }

      });
    }

    digData(data, null);

    return output;
  }

  function convertFlatData(data: $TreeNodeList) {
    const map: Map<$TreeNodeId, $TreeNodeData> = new Map();
    const _data = filterAndSortData(data);
    const output: Array<$TreeNodeData> = [];

    _data.forEach((item) => {
      map.set(item[fieldNames.id], {
        ...item,
        id: item[fieldNames.id],
        parentId: item[fieldNames.parentId],
        items: []
      });
    });

    _data.forEach((item) => {
      const parent = map.get(item[fieldNames.parentId]);
      const mapItem = map.get(item[fieldNames.id]);

      if (mapItem) {
        if (parent) {
          parent?.items?.push(mapItem);       
        } else {
          output.push(mapItem);
        }  
      }
    });

    return output;
  }

  const convertData = React.useMemo(() => {
    let output: $TreeNodeList = [];

    if (properties.nodes.type === "nest") {
      output = convertNestData(properties.nodes.data);
    } else {
      output = convertFlatData(properties.nodes.data);
    }

    return output;
  },[properties.nodes]);

  function findOriginalNode (node: $TreeNodeData) {
    return properties.nodes.data.find((n) => {
      return n[fieldNames.id] === node.id;
    });
  }

  function handleNodeToggle(node: $TreeNodeData) {
    if (!lodash.has(properties, ["expandedNodeIdentifiers"])) {
      setExpandedNodeIdentifiers((prev) => {
        const nodes = [...prev];
        const i = nodes.indexOf(node.id);
  
        if (i !== -1) {
          nodes.splice(i, 1);
        } else {
          nodes.push(node.id);
        }
  
        return nodes;
      });
    }
  }

  function handleExpandNode(node: $TreeNodeData) {
    const originalNode = findOriginalNode(node);

    handleNodeToggle(node);
    originalNode && properties.onExpandNode?.(originalNode);
  }

  function handleCollapseNode(node: $TreeNodeData) {
    const originalNode = findOriginalNode(node);

    handleNodeToggle(node);
    originalNode && properties.onCollapseNode?.(originalNode);
  }

  function handleNodeClick(node: $TreeNodeData) {
    if (!lodash.has(properties, ["selectedNodeIdentifiers"])) {
      setSelectedNodeIdentifiers((prev) => {
        const nodes = [...prev];
        const i = nodes.indexOf(node.id);
  
        if (i !== -1) {
          nodes.splice(i, 1);
        } else {
          nodes.push(node.id);
        }
  
        return nodes;
      });
    }
  }

  function handleSelectNode(node: $TreeNodeData) {
    const originalNode = findOriginalNode(node);

    handleNodeClick(node);
    originalNode && properties.onSelectNode?.(originalNode);
  }

  function handleUnselectNode(node: $TreeNodeData) {
    const originalNode = findOriginalNode(node);

    handleNodeClick(node);
    originalNode && properties.onUnselectNode?.(originalNode);
  }

  function nodesRenderer(nodes: $TreeNodeList, level: number = 0) {
    const currentExpandedNodes = nodes.map((node) => {
      return (properties.expandedNodeIdentifiers ?? $$expandedNodeIdentifiers).includes(node.id);
    });

    const currentSelectedItems = nodes.map((node) => {
      return (properties.selectedNodeIdentifiers ?? $$selectedNodeIdentifiers).includes(node.id);
    });

    const currentDisabledItems = nodes.map((node) => {
      return (properties.disabledNodeIdentifiers ?? []).includes(node.id);
    });
  
    const currentCrossedItems = nodes.map((node) => {
      return (properties.crossedNodeIdentifiers ?? []).includes(node.id);
    });
     
    return nodes.map((node, i) => {
      const hasChildren = node.items && node.items.length > 0;
      const isExpanded = currentExpandedNodes[i];
      const isSelected = currentSelectedItems[i];
      const isDisabled = currentDisabledItems[i];
      const isCrossed = currentCrossedItems[i];

      return (
        <React.Fragment>
          {lodash.isFunction(properties?.nodeRenderer) ? (
            (function() {
              const customNode = properties.nodeRenderer({
                node: node,
                isExpanded: isExpanded,
                isSelected: isSelected,
                isDisabled: isDisabled,
                isCrossed: isCrossed,
                onExpandNode: () => {return handleExpandNode(node);},
                onCollapseNode: () => {return handleCollapseNode(node);},
                onSelectNode: () => {return handleSelectNode(node);},
                onUnselectNode: () => {return handleUnselectNode(node);},
              });

              // @ts-expect-error ...
              return React.cloneElement(customNode, {
                key: node.id,
                level: level
              });
            })()
          ) : (
            <TreeNode
              key={node.id}
              node={node}
              level={level}
              isExpanded={isExpanded}
              isSelected={isSelected}
              isDisabled={isDisabled}
              isCrossed={isCrossed}
              onExpandNode={handleExpandNode}
              onCollapseNode={handleCollapseNode}
              onSelectNode={handleSelectNode}
              onUnselectNode={handleUnselectNode}
            />
          )}

          {isExpanded && hasChildren && (nodesRenderer(node.items!, level + 1))}
        </React.Fragment>
      );
    });
  }

  const {cx, classes} = useStyles();
  
  return (
    <div className={cx(classes["tree"], properties.className)}>
      {nodesRenderer(convertData)}
    </div>
  );
}

export default Tree;
