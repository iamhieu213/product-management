
const preview = document.querySelector(".preview-image");
const inputImage = document.querySelector("input[name='thumbnail']");

if(preview && inputImage) {
    const image = preview.querySelector("img");
    const close = preview.querySelector("[close-preview]");

    inputImage.addEventListener("change", () => {
        const file = inputImage.files[0];
        if(file) {
            image.src=URL.createObjectURL(file);
        }
    })

    close.addEventListener("click", (e) => {
        image.src=""
    })

}

//preview ảnh trang chỉnh sửa thông tin cá nhân 
const previewUser = document.querySelector(".preview-image");
const inputImageUser = document.querySelector("input[name='avatar']");

if(previewUser) {
    console.log(inputImageUser);
    
    const image = previewUser.querySelector("img");
    const close = previewUser.querySelector("[close-preview]");

    inputImageUser.addEventListener("change", () => {
        const file = inputImageUser.files[0];
        if(file) {
            image.src=URL.createObjectURL(file);
        }
    })

    close.addEventListener("click", (e) => {
        image.src=""
    })
}
//end preview user

const alertError = document.querySelector("[error-validate]");

if(alertError) {
    setTimeout(() => {
        alertError.classList.add("alert-hidden")
    }, parseInt(alertError.getAttribute('time')));
}