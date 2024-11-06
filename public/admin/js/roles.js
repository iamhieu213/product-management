const rows = document.querySelectorAll('tr[data-name]');
const updateButton = document.querySelector('button[update]');
let permissions = [];

if (rows && updateButton) {
    updateButton.addEventListener('click', () => {
        rows.forEach((row, index) => {
            const name = row.getAttribute('data-name');
            const inputs = row.querySelectorAll('input');


            if (name == 'id') {

                inputs.forEach(input => {
                    permissions.push({
                        id: input.value,
                        permissions: []
                    })

                })


            } else {
                inputs.forEach((input, index) => {
                    if (input.checked) {
                        permissions[index].permissions.push(name);
                    }
                })
            }
        })

        const formSubmitRoles = document.querySelector('form[form-data-roles-for-submit]');
        const inputSubmit  = formSubmitRoles.querySelector('input[input-data-roles-for-submit]');
        inputSubmit.value = JSON.stringify(permissions);
        formSubmitRoles.submit();
    })
}

const roles = document.querySelector('div[data-to-show]').getAttribute('data-to-show');
data = JSON.parse(roles)

if(data) {
    data.forEach((item, index) => {
        if(item.role.length) {
            item.role.forEach(itemRole => {
                const row = document.querySelector(`tr[data-name=${itemRole}]`);
                const inputs = row.querySelectorAll('input');
                inputs[index].checked=true;
            })
        }
    })
}
