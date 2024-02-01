export const ROOT_CLASS = "tree-node";

export type $TreeNodeId = string;

export type $TreeNodeList = Array<$TreeNodeData>;

export type $TreeNodeData = Record<string, any> & {
  id: $TreeNodeId,
  parentId?: $TreeNodeId | null,
  items?: $TreeNodeList
};

export type $TreeNodeProperties = React.HTMLAttributes<HTMLElement> & ({
  node: $TreeNodeData,
  level?: number,
  isExpanded: boolean,
  isSelected: boolean,
  isDisabled: boolean,
  isCrossed: boolean,
  isExpandable?: boolean,
  isSelectable?: boolean,
  labelRenderer?: string | (() => React.ReactNode),
  iconRenderer?: React.ReactNode | (() => React.ReactNode),
  onExpandNode: (node: $TreeNodeData) => void,
  onCollapseNode: (node: $TreeNodeData) => void,
  onSelectNode: (node: $TreeNodeData) => void,
  onUnselectNode: (node: $TreeNodeData) => void
});

export type $TreeNodeStyleProperties = $TreeNodeProperties;

export type $TreeNodeStyleClasses = `${typeof ROOT_CLASS} | tree-node__outer | ${typeof ROOT_CLASS}--state-disabled`;
