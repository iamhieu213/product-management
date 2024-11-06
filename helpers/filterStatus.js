module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
        },
        {
            name: "Hoạt động",
            status: "active",
            
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            
        }
    ];

    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
    }

    else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    return filterStatus;
}