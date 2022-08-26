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
};
