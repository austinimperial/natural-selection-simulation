import type { BugData } from './BugsProvider';

interface Node {
  isRoot: boolean;
  data: BugData;
  firstChild: Node | null;
  rightSibling: Node | null;
}

const createNode = ({
  data = {
    id: '',
    x: 0,
    y: 0,
    isAlive: false,
    color: [0,0,0],
    orientation: 0,
    clone: false
  },
  firstChild = null,
  rightSibling = null,
  isRoot = false,
}: {
  data: BugData;
  firstChild?: Node | null;
  rightSibling?: Node | null;
  isRoot?: boolean;
}): Node => ({
  isRoot,
  data,
  firstChild,
  rightSibling,
});

export { type Node, createNode };

export const addSibling = (node: Node, data: BugData): Node => {
  const newNode = createNode({ data });
  if (node.rightSibling === null) {
    node.rightSibling = newNode;
    return newNode;
  }
  return addSibling(node.rightSibling, data);
};

export const addChild = (node: Node, data: BugData): Node => {
  const newNode = createNode({ data });
  if (node.firstChild) return addSibling(node.firstChild, data);
  node.firstChild = newNode;
  return newNode;
};

export const flatten = (node: Node | null): Node[] => {
  if (!node) return [];
  if (node.isRoot)
    return [...flatten(node.firstChild), ...flatten(node.rightSibling)];
  if (!node.firstChild && !node.rightSibling) return [node];
  if (!node.firstChild && node.rightSibling)
    return [node, ...flatten(node.rightSibling)];
  if (node.firstChild && !node.rightSibling)
    return [node, ...flatten(node.firstChild)];
  return [node, ...flatten(node.firstChild), ...flatten(node.rightSibling)];
};

export const changeNodeData = (
  node: Node | null,
  dataId: string,
  changes: Partial<BugData>
): boolean => {
  if (!node) return false;
  if (!node.isRoot && node.data && node.data.id === dataId) {
    node.data = { ...node.data, ...changes };
    return true;
  }
  return (
    changeNodeData(node.firstChild, dataId, changes) ||
    changeNodeData(node.rightSibling, dataId, changes)
  );
};

export const getNode = (node: Node | null, dataId: string): Node | false => {
  if (!node) return false;
  if (!node.isRoot && node.data && node.data.id === dataId) {
    return node;
  }
  return getNode(node.firstChild, dataId) || getNode(node.rightSibling, dataId);
};

export const getLivingBugNodes = (
  node: Node | null
): Node[] => {
  if (!node) return [];
  if (node.isRoot)
    return [
      ...getLivingBugNodes(node.firstChild),
      ...getLivingBugNodes(node.rightSibling),
    ];

  const isAlive = (node: Node): Node[] => {
    if (node?.data?.isAlive) {
      return [node];
    } else {
      return [];
    }
  };

  if (!node.firstChild && !node.rightSibling) return [...isAlive(node)];
  if (!node.firstChild && node.rightSibling)
    return [
      ...isAlive(node),
      ...getLivingBugNodes(node.rightSibling),
    ];
  if (node.firstChild && !node.rightSibling)
    return [...isAlive(node), ...getLivingBugNodes(node.firstChild)];
  return [
    ...isAlive(node),
    ...getLivingBugNodes(node.firstChild),
    ...getLivingBugNodes(node.rightSibling),
  ];
};
