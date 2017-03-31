class Tree {
  constructor(value) {
    this.value = value
    this.children = []
  }

  DFSelect(filter) {
    let results = []
    const recurse = (node, depth) => {
      if (filter(node.value, depth)) {
        results.push(node.value)
      }
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i]
        recurse(child, depth + 1)
      }
    }
    recurse(this, 0)
    return results
  }

  addChild(child) {
    if (!child || !(child instanceof Tree)) {
      child = new Tree(child)
    }
    if (!this.isDescendant(child)) {
      this.children.push(child)
    } else {
      throw new Error('That child is already a child of this tree')
    }
    // return the new child node for convenience
    return child
  }

  isDescendant(child) {
    if (this.children.includes(child)) {
      // `child` is an immediate child of this tree
      return true
    } else {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].isDescendant(child)) {
          // `child` is descendant of this tree
          return true
        }
      }
      return false
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child)
    if (index !== -1) {
      // remove the child
      this.children.splice(index, 1)
    } else {
      throw new Error('That node is not an immediate child of this tree')
    }
  }
}

export default Tree
