module.exports = (paginationObj, query, quantityProducts) => {

    if(query.page) {
        paginationObj.currentPage = parseInt(query.page);
    }
    paginationObj.quantityPage = Math.ceil(quantityProducts/paginationObj.limit);
    paginationObj.skip = (paginationObj.currentPage-1)*paginationObj.limit;
    return paginationObj
}