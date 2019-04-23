/**
 * 模拟二叉树
 */
function BinatryTree(key) {
    // 树的根节点
    this.root = null
    /**
     * 模拟树节点结构
     */
    var Node = function (key) {
        this.key = key     // 节点值
        this.left = null   // 左孩子节点
        this.right = null  // 右孩子节点
    }

    // 插入节点
    // 若插入节点比当前节点小，并且当前节点左节点为null，则插入当前节点左侧
    // 若插入节点比当前节点大，并且当前节点右节点为null，则插入当前节点右侧

    /**
     * @param {node} node 当前节点
     * @param {node} newNode 新插入节点
     */
    var insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            // 左节点
            if (node.left === null) {
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        } else {
            // 右节点
            if (node.right === null) {
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }

    // 依次插入节点
    this.insert = function (key) {
        var newNode = new Node(key)
        if (this.root === null) {
            // 插入第一个根节点
            this.root = newNode
        } else {
            insertNode(this.root, newNode)
        }
    }

    // 中序遍历
    // 先遍历当前节点的左子树
    // 再返回当前节点
    // 最后遍历当前节点的右子树
    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            // 递归遍历
            inOrderTraverseNode(node.left, callback)
            callback(node.key)
            inOrderTraverseNode(node.right, callback)
        }
    }

    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(this.root, callback)
    }

    // 前序遍历
    // 先返回当前节点
    // 再遍历当前节点的左子树
    // 最后遍历当前节点的右子树
    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            // 递归遍历
            callback(node.key)
            preOrderTraverseNode(node.left, callback)
            preOrderTraverseNode(node.right, callback)
        }
    }

    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(this.root, callback)
    }

    // 后序遍历
    // 先遍历当前节点的左子树
    // 再遍历当前节点的右子树
    // 最后返回当前节点
    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            // 递归遍历
            postOrderTraverseNode(node.left, callback)
            postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(this.root, callback)
    }

}

var testNodes = [8, 3, 1, 4, 6, 10, 7, 14, 11]
var binatryTree = new BinatryTree()
testNodes.forEach(key => {
    binatryTree.insert(key)
})

var cb = key => console.log(key)
console.log('myTreeNode::', binatryTree.root)
console.log('inOrderTraverse::', binatryTree.inOrderTraverse(cb))
console.log('preOrderTraverse::', binatryTree.preOrderTraverse(cb))
console.log('postOrderTraverse::', binatryTree.postOrderTraverse(cb))