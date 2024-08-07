// Node class / factory, containing a value property and a link to the nextNode, set both as null by default.
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default Node;
