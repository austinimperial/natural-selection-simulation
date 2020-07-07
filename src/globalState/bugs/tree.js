export class Node 
{ 
    constructor(data,firstChild,rightSibling) 
    { 
        this.data = data || null;
        this.firstChild = firstChild || null;
        this.rightSibling = rightSibling || null;
    }

    addSibling = (data) => {
        const newNode = new Node(data)
        if (this.rightSibling === null) return this.rightSibling = newNode
        return this.rightSibling.addSibling(data)
    }

    addChild = (data) => {
        const newNode = new Node(data)
        if (this.firstChild) return this.firstChild.addSibling(data)
        return this.firstChild = newNode
    }
} 

export const flatten = (node) => {
    if (!node.firstChild && !node.rightSibling) return [node.data]
    if (!node.firstChild && node.rightSibling) return [node.data, ...flatten(node.rightSibling)]
    if (node.firstChild && !node.rightSibling) return [node.data, ...flatten(node.firstChild)]
    return [node.data, ...flatten(node.firstChild), ...flatten(node.rightSibling)]
}

export const changeData = (root,nodeId,changes) => {
    if (!root || !root.data) return 
    if (root.data.id === nodeId) return root.data = {...root.data, ...changes}
    changeData(root.firstChild,nodeId,changes)
    changeData(root.rightSibling,nodeId,changes)
    return root
}