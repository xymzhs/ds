import { Compare, defaultCompare } from "./utils";
const Colors = {
  RED: 1,
  BLACK: 0,
};
const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};
export class Node {
  key: any;
  left: any;
  right: any;
  constructor(key: any) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export class RedBlackNode extends Node {
  parent: any;
  color: any;
  constructor(key: any) {
    super(key);
    this.key = key;
    this.color = Colors.RED;
    this.parent = null;
  }
  isRed() {
    return this.color === Colors.RED;
  }
}

export class BinarySearchTree {
  compareFn: any;
  root: any;
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }
  getNodeHeight(node: Node): number {
    if (node == null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  insert(key: any) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  protected insertNode(node: Node, key: any) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }
  search(key: any) {
    return this.searchNode(this.root, key);
  }
  searchNode(node: any, key: any): Boolean {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }
  inOrderTraverse(callback: any) {
    function inOrderTraverseNode(node: any, callback: any) {
      if (node != null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.key);
        inOrderTraverseNode(node.right, callback);
      }
    }
    inOrderTraverseNode(this.root, callback);
  }
  preOrderTraverse(callback: any) {
    function preOrderTraverseNode(node: any, callback: any) {
      if (node != null) {
        callback(node.key);
        preOrderTraverseNode(node.left, callback);
        preOrderTraverseNode(node.right, callback);
      }
    }
    preOrderTraverseNode(this.root, callback);
  }
  postOrderTraverse(callback: any) {
    function postOrderTraverseNode(node: any, callback: any) {
      if (node != null) {
        postOrderTraverseNode(node.left, callback);
        postOrderTraverseNode(node.right, callback);
        callback(node.key);
      }
    }
    postOrderTraverseNode(this.root, callback);
  }
  min() {
    return this.minNode(this.root);
  }
  minNode(node: any) {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current;
  }
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node: any) {
    let current = this.root;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  remove(key: any) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node: any, key: any) {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }
      if (node.left == null) {
        node = node.right;
        return node;
      }
      if (node.right == null) {
        node = node.left;
        return node;
      }
      const aux = this.minNode(node.right);
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }
}

// more search less insert/remove
export class AVLTree extends BinarySearchTree {
  compareFn: any;
  root: any;
  constructor(compareFn = defaultCompare) {
    super(defaultCompare);
    this.compareFn = compareFn;
    this.root = null;
  }
  getBalanceFactor(node: Node) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  // LL
  rotationLL(node: any) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }
  // RR
  rotationRR(node: any) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }
  // LR
  rotationLR(node: any) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }
  // RL
  rotationRL(node: any) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  insert(key: number) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node: any, key: any) {
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node;
    }

    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        return this.rotationRL(node);
      }
    }
    return node;
  }

  removeNode(node: any, key: any) {
    node = super.removeNode(node, key);
    if (node == null) {
      return node;
    }
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if (
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }
    return node;
  }
}

// more insert/remove less search
export class RedBlackTree extends BinarySearchTree {
  compareFn: any;
  root: any;
  constructor(compareFn = defaultCompare) {
    super(defaultCompare);
    this.compareFn = compareFn;
    this.root = null;
  }
  insert(key: any) {
    if (this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }
  insertNode(node: any, key: any): any {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key);
      node.right.parent = node;
      return node.right;
    } else {
      return this.insertNode(node.right, key);
    }
  }
  rotationLL(node: any) {
    const tmp = node.left;
    node.left = tmp.right;
    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.right = node;
    node.parent = tmp;
  }
  rotationRR(node: any) {
    const tmp = node.right;
    node.right = tmp.left;
    if (tmp.left && tmp.left.key) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.left = node;
    node.parent = tmp;
  }
  fixTreeProperties(node: any) {
    while (
      node &&
      node.parent &&
      node.parent.isRed() &&
      node.color !== Colors.BLACK
    ) {
      let parent = node.parent;
      const grandParent = parent.grandParent;
      // 父节点是左侧子节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right;
        // 叔叔节点也是红色--需要重新填色
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // 节点是右侧子节点--左旋转
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          } else {
            // 节点是左侧子节点--右旋转
            this.rotationLL(grandParent);
            parent.color = Colors.BLACK;
            grandParent.color = Colors.RED;
            node = parent;
          }
        }
      } else {
        // 父节点是右侧子节点
        const uncle = grandParent.left;
        // 叔叔节点是红色--只需要重新填色
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // 节点是左侧子节点--右旋转
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          } else {
            // 节点是右侧子节点--左旋转
            this.rotationRR(grandParent);
            parent.color = Colors.BLACK;
            grandParent.color = Colors.RED;
            node = parent;
          }
        }
      }
    }
    this.root.color = Colors.BLACK;
  }
}
