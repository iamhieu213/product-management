module.exports = (query) => {
    let objSearch = {
        keyword: ""
    }

    if(query.q) {
        objSearch.keyword = query.q,
        objSearch.regex = { $regex: query.q, $options: 'i' }
    }

    return objSearch
}