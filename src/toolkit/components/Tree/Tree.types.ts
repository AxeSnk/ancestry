import {$TreeNodeData, $TreeNodeId, $TreeNodeList} from "./TreeNode.types";

export type $TreeNodeRenderFn = (props: {
  node: $TreeNodeData,
  isExpanded: boolean,
  isSelected: boolean,
  isDisabled: boolean,
  isCrossed: boolean,
  onExpandNode: () => void,
  onCollapseNode: () => void,
  onSelectNode: () => void,
  onUnselectNode: () => void
}) => React.ReactNode;

export type $TreeProperties = React.HTMLAttributes<HTMLElement> & ({
  nodes: {
    extractors?: {
      identifier?: string,
      parentIdentifier?: string,
      objectsIdentifier?: string
    },
    type?: "flat" | "nest",
    data: $TreeNodeList // bind extractors keys to data
  },  
  expandedNodeIdentifiers?: Array<$TreeNodeId>,
  defaultExpandedNodeIdentifiers?: Array<$TreeNodeId>, 
  selectedNodeIdentifiers?: Array<$TreeNodeId>,
  defaultSelectedNodeIdentifiers?: Array<$TreeNodeId>,
  disabledNodeIdentifiers?: Array<$TreeNodeId>,
  crossedNodeIdentifiers?: Array<$TreeNodeId>,
  filter?: (treeNodes: $TreeNodeList) => $TreeNodeList,
  sort?: (treeNodes: $TreeNodeList) => $TreeNodeList,
  nodeRenderer?: $TreeNodeRenderFn,
  onExpandNode?: (node: $TreeNodeData) => void,
  onCollapseNode?: (node: $TreeNodeData) => void,
  onSelectNode?: (node: $TreeNodeData) => void,
  onUnselectNode?: (node: $TreeNodeData) => void
});

export type $TreeStyleProperties = $TreeProperties;

export type $TreeStyleClasses = "tree";
