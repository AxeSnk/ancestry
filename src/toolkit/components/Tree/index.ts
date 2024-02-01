import lodash from "lodash";

import Tree from "./Tree.component";
import TreeNode from './TreeNode.component';

export default lodash.assign(Tree, {
  Node: TreeNode
});