import Node from './Node.js';

// LinkedList class / factory, which will represent the full list.
class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0; // Initializes list at size 0
  }

  // Returns the first node in the list
  get head() {
    return this._head;
  }

  // Returns the last node in the list
  get tail() {
    return this._tail;
  }

  // Returns the total number of nodes in the list
  get size() {
    return this._size;
  }

  // Validate if the node is an instance of Node
  validateNode(node) {
    if (!(node instanceof Node)) {
      throw new Error(`Invalid node type: ${node}\nMust be an instance of Node`);
    }
  }

  setHeadNode(node) {
    // Ensure the node is of the correct type
    this.validateNode(node);

    // If a head doesn't exist, set this node to both head and tail
    if (!this.head) {
      this._head = node;
      this._tail = node;
      node.next = null;
    } else {
      // If this node doesn't already have a link, link it to the current head node
      if (node.next === null) {
        node.next = this.head;
      }

      // Then set this node as the new head node
      this._head = node;
    }
  }

  setTailNode(node) {
    if (!this.head || !this.tail) return;

    // Ensure the node is of the correct type
    this.validateNode(node);

    // Link the current tail node to this node
    this.tail.next = node;

    // Set this node as the new tail node
    this._tail = node;
    node.next = null;
  }

  // Adds a new node containing value to the end of the list
  append(value) {
    const node = new Node(value);

    if (!this.head) {
      // If there is no head node, set this node as the head node
      this.setHeadNode(node);
    } else {
      // Else set this node as the tail node
      this.setTailNode(node);
    }

    // Increase list size by 1
    this._size++;
  }

  // Adds a new node containing value to the start of the list
  prepend(value) {
    const node = new Node(value);

    // Set this node as the head node
    this.setHeadNode(node);

    // Increase list size by 1
    this._size++;
  }

  // Traverse the LinkedList with a callback function
  traverse(callback) {
    if (this.size === 0) return;

    // Provide a default callback if none is provided
    if (!callback) {
      callback = (node) => {
        console.log(node.value);
      };
    }

    // Set the current node as the head node to begin traversal
    let currentNode = this.head;

    while (currentNode) {
      // Stop traversal if callback function returns true
      if (callback(currentNode) === true) {
        return true;
      }

      // Update current node
      currentNode = currentNode.next;
    }
  }

  // Removes the last node from the list
  pop() {
    if (this._size === 0) return;

    const pop = (node) => {
      if (node === this.head && node === this.tail) {
        // If this node is both the head and tail node, set head and tail nodes to null
        this._head = null;
        this._tail = null;
      } else if (node.next === this.tail) {
        // Else if the next node is the tail node, set this node as the new tail node
        node.next = null;
        this._tail = node;
        return true; // Stop traversal
      }
    };

    // For each node, execute the pop function
    this.traverse(pop);

    // Decrease list size by 1
    this._size--;
  }

  // Returns true if the passed in value is in the list and otherwise returns false.
  contains(value) {
    const contains = (node) => {
      if (node.value == value) {
        return true; // Stop traversal
      }
    };

    // For each node, execute the contains function
    return this.traverse(contains) ? true : false;
  }

  // Returns the index of the node containing value, or null if not found.
  find(value) {
    let currentIndex = 0;

    const find = (node) => {
      if (node.value == value) {
        return true; // Stop traversal
      }
      currentIndex++;
    };

    // For each node, execute the find function
    return this.traverse(find) ? currentIndex : null;
  }

  // Returns the node at the given index
  at(index) {
    let currentIndex = 0;
    let nodeAtIndex = null;

    const at = (node) => {
      if (currentIndex === index) {
        nodeAtIndex = node;
        return true; // Stop traversal
      }
      currentIndex++;
    };

    // For each node, execute the at function
    this.traverse(at);

    return nodeAtIndex ? nodeAtIndex : null;
  }

  // Represents LinkedList objects as strings
  toString() {
    let resultString = '';

    const toString = (node) => {
      // Append this nodes value to the string
      resultString += `( ${node.value} )${node.next ? ' => ' : ''}`;
    };

    // For each node, execute the toString function
    this.traverse(toString);

    return resultString;
  }

  // Inserts a new node with the provided value at the given index
  insertAt(value, index) {
    const node = new Node(value);

    if (index === 0) {
      // If the index is 0, set the new node as the head node
      this.setHeadNode(node);
    } else {
      const nodeAtPrevIndex = this.at(index - 1);
      const nodeAtIndex = nodeAtPrevIndex.next;

      // Link the new node to the node currently at the index
      node.next = nodeAtIndex;

      // Link the previous node to the new node
      nodeAtPrevIndex.next = node;
    }

    // Increase the list size by 1
    this._size++;
  }

  // Removes the node at the given index
  removeAt(index) {
    if (index < 0) return;

    if (index >= this._size) {
      console.error('Index out of bounds');
      return;
    }

    if (this._size === 1) {
      // If only one node remaining, execute pop
      this.pop();
      return;
    }

    if (index === 0) {
      // If the index is 0, update the head node
      this.setHeadNode(this.head.next);

      // Decrease list size by 1
      this._size--;

      // Remove links from the head if only 1 node remains
      if (this._size === 1) {
        this.head.next = null;
      }

      return;
    }

    // If the index is greater than 0
    const nodeAtPrevIndex = this.at(index - 1);
    const nodeAtIndex = nodeAtPrevIndex.next;

    if (nodeAtIndex === this.tail) {
      // If the node at the index is the tail node, set the previous node as the new tail node
      this.setTailNode(nodeAtPrevIndex);
    } else {
      // Else link the previous node to the next node
      const nextNode = nodeAtIndex.next;
      nodeAtPrevIndex.next = nextNode;
    }

    // Decrease list size by 1
    this._size--;
  }
}

export default LinkedList;
export { Node };
