'use strict';
const Node = require('./Node');
class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }
    isEmpty() {
        if (this.front === null || this.length === 0) {
            return true;
        } else {
            return false;
        }

        // return this.front ===null;
        // return this.length ===0;
    }
    enqueue(value) {
        // i do care only about the rear
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
            this.length += 1;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
            this.length += 1;
        }
    }
    dequeue() {
        // i do care only about the front
        if (this.isEmpty()) {
            return 'the queue is empty';
        } else {
            const temp = this.front;
            this.front = this.front.next;
            temp.next = null;
            this.length -= 1;
            return temp.value;
        }
    }
    peek() {
        // i do care only about the front
        if (this.isEmpty()) {
            return null;
        }
        return this.front.value;
    }
}
module.exports = Queue;