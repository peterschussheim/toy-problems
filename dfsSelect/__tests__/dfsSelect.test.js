/*eslint no-undef: 0*/
/*eslint-env node*/

import Tree from '../dfsSelect'

describe('Tree', function() {
  it('should exist', function() {
    expect(Tree).toBeDefined()
  })
})

describe('DFSelect', function() {
  it('should exist on the Tree prototype', function() {
    expect(Tree.prototype.DFSelect).toBeDefined()
  })

  it('should be a function', function() {
    expect(Tree.prototype.DFSelect).toBeInstanceOf(Function)
  })

  it('should return an array', function() {
    var root = new Tree('root')
    var all = function() {
      return true
    }
    expect(Array.isArray(root.DFSelect(all))).toBeTruthy()
  })

  it('should return all nodes in the tree if filter always returns true', function() {
    // this filter function should always return all of the nodes
    var all = function() {
      return true
    }
    // keep a list of all nodes to compare
    // depth: 0
    var root = new Tree(1)
    // depth: 1
    root.addChild(2)
    root.addChild(3)
    // depth: 2
    root.children[0].addChild(4)
    root.children[0].addChild(5)
    root.children[1].addChild(6)
    root.children[1].addChild(7)
    // depth: 3 (sparse)
    root.children[0].children[0].addChild(8)
    root.children[1].children[1].addChild(9)
    var expected = [1, 2, 4, 8, 5, 3, 6, 7, 9]

    // we should expect back all the nodes we added
    var result = root.DFSelect(all)
    expect(result).toHaveLength(expected.length)
    expect(result).toEqual(expected)
  })

  it('should return all nodes passing the filter', function() {
    // this filter function should return all true nodes
    var trueFilter = function(value, depth) {
      return value === true
    }
    // this filter function should return all false nodes
    var falseFilter = function(value, depth) {
      return value === false
    }
    // keep a list of true and false nodes to compare
    var trueNodes = [], falseNodes = [], result = null
    // depth: 0
    var root = new Tree(false)
    falseNodes.push(false)
    // depth: 1
    trueNodes.push(true), root.addChild(true)
    falseNodes.push(false), root.addChild(false)
    // depth: 2
    trueNodes.push(true), root.children[0].addChild(true)
    trueNodes.push(true), root.children[1].addChild(true)
    falseNodes.push(false), root.children[0].addChild(false)
    falseNodes.push(false), root.children[1].addChild(false)
    // depth: 3 (sparse)
    trueNodes.push(true), root.children[0].children[0].addChild(true)
    trueNodes.push(true), root.children[1].children[0].addChild(true)
    falseNodes.push(false), root.children[0].children[1].addChild(false)
    falseNodes.push(false), root.children[1].children[1].addChild(false)

    result = root.DFSelect(trueFilter)
    // we expect back all the `trueNodes` using the `trueFilter`
    expect(result).toEqual(trueNodes)

    result = root.DFSelect(falseFilter)
    // we expect back all the `falseNodes` using the `falseFilter`
    expect(result).toEqual(falseNodes)
  })

  it('should allow filtering by depth', function() {
    // this filter constructor produces a filter for the specified depth
    var depthFilter = function(filterDepth) {
      return function(node, nodeDepth) {
        return filterDepth == nodeDepth
      }
    }
    // keep a list of nodes by depth to compare
    var nodeDepths = [], deepNodes = []
    var root = new Tree(0)
    // depth: 0
    nodeDepths.push([0])
    // depth: 1
    root.addChild(1)
    root.addChild(2)
    nodeDepths.push([1, 2])
    // depth: 2
    root.children[0].addChild(3)
    root.children[0].addChild(4)
    root.children[1].addChild(5)
    root.children[1].addChild(6)
    nodeDepths.push([3, 4, 5, 6])
    // depth: 3 (sparse)
    root.children[0].children[0].addChild(7)
    root.children[0].children[0].addChild(8)
    root.children[1].children[0].addChild(9)
    root.children[1].children[0].addChild(10)
    nodeDepths.push([7, 8, 9, 10])

    expect(root.DFSelect(depthFilter(0))).toEqual(nodeDepths[0])
    expect(root.DFSelect(depthFilter(1))).toEqual(nodeDepths[1])
    expect(root.DFSelect(depthFilter(2))).toEqual(nodeDepths[2])
    expect(root.DFSelect(depthFilter(3))).toEqual(nodeDepths[3])
  })
})
