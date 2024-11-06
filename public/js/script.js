const buttonStatus = document.querySelectorAll("[button-status]");

//Bộ lọc theo trạng thái
if (buttonStatus.length) {
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            const url = new URL(window.location.href);
            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            url.searchParams.delete("page")
            window.location.href = url.href;
        })
    })
}
//End bộ lọc theo trạng thái


//Thanh tìm kiếm
const formSearch = document.querySelector("form[form-search-products-admin]");
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();

        const url = new URL(window.location.href);
        if (e.target[0].value) {
            url.searchParams.set("q", e.target[0].value)
        } else {
            url.searchParams.delete("q")
        }
        window.location.href = url.href;
    })
}
//End thanh tìm kiếm

//Nút phân trang
const paginationButtons = document.querySelectorAll("[buttonNumber]");
if (paginationButtons) {
    paginationButtons.forEach(button => {
        const url = new URL(window.location.href);
        button.addEventListener("click", () => {
            url.searchParams.set("page", button.getAttribute("buttonNumber"));
            window.location.href = url.href;
        })
    })
}
//End nút phân trang

//Thay đổi trạng thái 1 sản phẩm
const buttonChangeStatus = document.querySelectorAll("[change-status-button]");
if (buttonChangeStatus) {
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("id");
            const status = button.getAttribute("status");

            const newStatus = status == "active" ? "inactive" : "active";

            const formChangeStatus = document.querySelector("#form-change-status");
            formChangeStatus.action = formChangeStatus.getAttribute("path") + `/${newStatus}/${id}?_method=PATCH`;

            formChangeStatus.submit();
        })
    });
}
//End thay đổi trạng thái 1 sản phẩm

//Xử lý cho hộp chọn nhiều sản phẩm
const table = document.querySelector("[checkbox-multi]");
if (table) {
    const checkboxAll = table.querySelector("input[value='checkall']");
    const checkboxList = table.querySelectorAll("input[name='id']");

    if(checkboxAll) {
        checkboxAll.addEventListener("click", () => {
            if (checkboxAll.checked) {
                checkboxList.forEach(item => {
                    item.checked = true
                })
            } else {
                checkboxList.forEach(item => {
                    item.checked = false
                })
            }
        })
    }

    if(checkboxList) {
        checkboxList.forEach(item => {
            item.addEventListener("click", () => {
                const checkedList = table.querySelectorAll("input[name='id']:checked");
    
                if (checkedList.length == checkboxList.length) {
                    checkboxAll.checked = true;
                } else {
                    checkboxAll.checked = false;
                }
            })
        })
    }

    const formChangeMulti = document.querySelector("[form-change-multi]");
    if (formChangeMulti) {
        formChangeMulti.addEventListener("submit", (e) => {
            e.preventDefault();
            const checkedList = table.querySelectorAll("input[name='id']:checked");
            const type = e.target[0].value;
            if (type == "delete-all") {
                let cf = confirm("Xóa không?");
                if (!cf) {
                    return;
                }
            }
            if (checkboxList.length > 0) {
                const ids = [];

                if (type == "change-position") {
                    checkedList.forEach(item => {
                        const inputPosition = item.closest("tr").querySelector("[name='position']");
                        const dataSubmit = item.value + "-" + inputPosition.value;
                        ids.push(dataSubmit);
                    })
                } else {
                    checkedList.forEach(item => {
                        ids.push(item.value)
                    })
                }

                e.target[1].value = ids.join(", ");
                formChangeMulti.submit();
            }
        })
    }
}

//End hộp chọn nhiều sản phẩm

//THÔNG BÁO ALERT
const alertError = document.querySelector("[error-validate]");
if (alertError) {
    setTimeout(() => {
        alertError.classList.add("alert-hidden")
    }, parseInt(alertError.getAttribute('time')));
}
//END THÔNG BÁO ALERT

//Sort

const sort = document.querySelector("#sort");

if(sort) {
    sort.addEventListener("change", () => {
        const url = new URL(window.location.href);
        const [sortKey, sortValue] = sort.value.split('-')
        
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        window.location.href = url.href;
    })
}

//end Sort

const url = new URL(window.location.href);

const sortKey = url.searchParams.get("sortKey");
const sortValue = url.searchParams.get("sortValue");

if(sortKey&&sortValue) {
    const str = `[value="${sortKey+ '-' + sortValue}"]`;
    console.log(str);
    
    const itemChecked = document.querySelector(str);
    console.log(itemChecked);
    
    itemChecked.selected = true
}


const inputQuantity = document.querySelectorAll('input[name="quantity"]');
if(inputQuantity) {
    inputQuantity.forEach(input => {
        input.addEventListener('change', () => {
            const productId = input.getAttribute('product-id');
            const quantity = input.value;
            window.location.href = `/carts/update/${productId}/${quantity}`
        })
    })
}

const buttonsDelete = document.querySelectorAll('[button-delete-checkout]');
if(buttonsDelete) {
    buttonsDelete.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('product-id');
            window.location.href = `/carts/delete/${productId}`
        })
    })
}