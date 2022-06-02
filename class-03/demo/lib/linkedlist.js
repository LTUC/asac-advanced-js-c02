'use strict';
const Node = require('./node');

class LinkedList {
    constructor() {
        this.head = null;
        // length 
        // tail
    }
    append(value) {
        const newNode = new Node(value);
        //we need to check if the LL is empty or not 
        // if(this.head === null){}
        //if it is empty
        if (!this.head) {
            this.head = newNode;
            return this;
        }
        else {
            // if the LL is not empty
            let currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
            return this;
        }
    }

}


module.exports = LinkedList;