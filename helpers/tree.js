let count = 0
const createTree = (arr, parentID) => {
    let tree = [];
    arr.forEach(item => {
        const newItem = item;
        if(item.parentID == parentID) {
            newItem.index = ++count;
            const children = createTree(arr, item.id);
            if(children.length) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    })
    return tree;
}

module.exports.create = (arr, parentID) => {
    count = 0;
    return createTree(arr, parentID);
}