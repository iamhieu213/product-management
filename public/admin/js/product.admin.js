const buttonsDelete = document.querySelectorAll("[delete-item]");

if(buttonsDelete) {
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const formDeleteOne = document.querySelector("#form-delete-one");
            const path = formDeleteOne.getAttribute("path") + `/${button.getAttribute("data-id")}?_method=DELETE`;
            formDeleteOne.action = path;
            formDeleteOne.submit();
        })
    });
}


