const bstNode = (value = null, left = null, right = null) => {
  return { value, left, right };
};

tree = (array = []) => {
  let root = buildTree(array);

  function getMinValue(node) {
    let minValue = node.value;
    while (node.left !== null) {
      minValue = node.left.value;
      node = node.left;
    }
    return minValue;
  }

  function buildTree(arr) {
    if (arr.length === 0) return null;

    let sorted = arr.sort((a, b) => a - b);

    const mid = Math.floor(sorted.length / 2);
    const root = bstNode(
      sorted[mid],
      buildTree(sorted.slice(0, mid)),
      buildTree(sorted.slice(mid + 1))
    );
    return root;
  }

  function insertNode(value, node = root) {
    if (node === null) return bstNode(value);
    if (node.value > value) {
      insertNode(value, node.left);
    }
    if (node.value < value) {
      insertNode(value, node.right);
    }
    return node;
  }

  function deleteNode(value, node = root) {
    if (node === null) return node;
    if (node.value < value) {
      node.right = deleteNode(value, node.right);
    } else if (node.value > value) {
      node.left = deleteNode(value, node.left);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
    }
    return node;
  }
};
