export class Node {
  constructor({
    data = null,
    firstChild = null,
    rightSibling = null,
    isRoot = false,
  }) {
    this.isRoot = isRoot;
    this.data = data;
    this.firstChild = firstChild;
    this.rightSibling = rightSibling;
  }
}

export const addSibling = (node, data) => {
  const newNode = new Node({ data });
  if (node.rightSibling === null) return (node.rightSibling = newNode);
  return addSibling(node.rightSibling, data);
};

export const addChild = (node, data) => {
  const newNode = new Node({ data });
  if (node.firstChild) return addSibling(node.firstChild, data);
  return (node.firstChild = newNode);
};

export const flatten = (node) => {
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

export const changeNodeData = (node, dataId, changes) => {
  if (!node) return false;
  if (!node.isRoot && node.data.id === dataId) {
    return (node.data = { ...node.data, ...changes });
  }
  return (
    changeNodeData(node.firstChild, dataId, changes) ||
    changeNodeData(node.rightSibling, dataId, changes)
  );
};

export const getNode = (node, dataId) => {
  if (!node) return false;
  if (!node.isRoot && node.data.id === dataId) {
    return node;
  }
  return getNode(node.firstChild, dataId) || getNode(node.rightSibling, dataId);
};

export const getLivingBugNodes = (node, dataOnly = false) => {
  if (!node) return [];
  if (node.isRoot)
    return [
      ...getLivingBugNodes(node.firstChild, dataOnly),
      ...getLivingBugNodes(node.rightSibling, dataOnly),
    ];

  const isAlive = (node) => {
    if (node.data.isAlive) {
      return dataOnly ? [node.data] : [node];
    } else {
      return [];
    }
  };

  if (!node.firstChild && !node.rightSibling) return [...isAlive(node)];
  if (!node.firstChild && node.rightSibling)
    return [
      ...isAlive(node),
      ...getLivingBugNodes(node.rightSibling, dataOnly),
    ];
  if (node.firstChild && !node.rightSibling)
    return [...isAlive(node), ...getLivingBugNodes(node.firstChild, dataOnly)];
  return [
    ...isAlive(node),
    ...getLivingBugNodes(node.firstChild, dataOnly),
    ...getLivingBugNodes(node.rightSibling, dataOnly),
  ];
};
