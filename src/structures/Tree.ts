import { Compare, defaultCompare } from "./utils";
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

export class BinarySearchTree {
  compareFn: any;
  root: any;
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
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

class AVLTree extends BinarySearchTree {
  compareFn: any;
  root: any;
  constructor(compareFn = defaultCompare) {
    super(defaultCompare);
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
}
