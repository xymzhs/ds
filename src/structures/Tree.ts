import { Compare, defaultCompare } from "./utils";
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
    constructor(compareFn = defaultCompare){
        this.compareFn = compareFn
        this.root = null
    }

    insert(key: any){

    }
    search(key: any){
        // function searchNode(node:any,key:any) {
        //     if(node){
        //         if(compareFn)
        //     }
        //     return false
        // }
        // return searchNode(this.root,key)
    }
    inOrderTraverse(callback: any){
        function inOrderTraverseNode(node: any,callback: any){
            if(this.root !=null){
                inOrderTraverseNode(node.left,callback)
                callback(node.key)
                inOrderTraverseNode(node.right,callback)
            }
        }
        inOrderTraverseNode(this.root,callback)
    }
    preOrderTraverse(callback: any){
        function preOrderTraverseNode(node: any,callback: any){
            if(this.root !=null){
                callback(node.key)
                preOrderTraverseNode(node.left,callback)
                preOrderTraverseNode(node.right,callback)
            }
        }
        preOrderTraverseNode(this.root,callback)
    }
    postOrderTraverse(callback: any){
        function postOrderTraverseNode(node: any,callback: any){
            if(this.root !=null){
                
                postOrderTraverseNode(node.left,callback)
                postOrderTraverseNode(node.right,callback)
                callback(node.key)
            }
        }
        postOrderTraverseNode(this.root,callback)
    }
    min(){
        let current = this.root
        while (current && current.left) {
            current = current.left
        }
        return current
    }
    max(){
        let current = this.root
        while (current && current.right) {
            current = current.right
        }
        return current
    }
    remove(key: any){}
}


