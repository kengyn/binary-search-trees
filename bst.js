const bstNode = (value = null, left = null, right = null) => {
  return { value, left, right };
};

tree = (array = []) => {
  let root = buildTree(array);

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

  function findNode(value, node = root) {
    if (node === null || node.value === value) return node;
    if (node.value < value) {
      findNode(value, node.right);
    } else if (node.value > value) {
      findNode(value, node.left);
    }
  }

  function levelOrder(callback) {
    const queue = [root];
    const results = [];

    while (queue.length > 0) {
      const node = queue.shift();

      if (callback) {
        callback(node);
      } else {
        results.push(node.value);
      }
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  function inorder(callback, node = root, inorderList = []) {
    if (node === null) return;

    inorder(callback, node.left, inorderList);
    if (callback) {
      callback(node);
    } else {
      inorderList.push(node.value);
    }
    inorder(callback, node.right, inorderList);
  }
  function preorder(callback, node = root, preorderList = []) {
    if (node === null) return;

    if (callback) {
      callback(node);
    } else {
      preorderList.push(node.value);
    }
    preorder(callback, node.left, preorderList);
    preorder(callback, node.right, preorderList);
  }
  function postorder(callback, node = root, postorderList = []) {
    if (node === null) return;

    postorder(callback, node.left, postorderList);
    postorder(callback, node.right, postorderList);
    if (callback) {
      callback(node);
    } else {
      postorderList.push(node.value);
    }
  }

  function height(node = root) {
    if (node === null) return 0;

    return Math.max(height(node.left) + 1, height(node.right) + 1);
  }

  function depth(value, node = root) {
    if (node === null) return 0;

    return Math.max(depth(node.left) + 1, depth(node.right) + 1);
  }

  function isBalanced(node = root) {
    if (node === null) {
      return true;
    }
    return (
      Math.abs(height(node.left) - height(node.right)) <= 1 &&
      isBalanced(node.left) &&
      isBalanced(node.right)
    );
  }

  function rebalance() {
    root = buildTree(inorder());
  }

  return {
    root,
    buildTree,
    insertNode,
    deleteNode,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};
