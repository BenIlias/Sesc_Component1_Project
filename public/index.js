const inpt = document.querySelector('input');
const tbody = document.querySelector('tbody')

inpt.addEventListener('keyup', () => {
    const valueInpt = inpt.value.trim().toLowerCase();
    Array.from(tbody.children).forEach(tr => {
        tr.classList.remove('d-none')
    })
    Array.from(tbody.children)
        .forEach(tr => {
            if (!(tr.children[0].textContent.toLowerCase().includes(valueInpt) || tr.children[1].textContent.toLowerCase().includes(valueInpt))) {
                tr.classList.add('d-none')
            }
        })

});

const links = document.querySelectorAll('td>a')

links.forEach(link => {
    link.addEventListener('click', () => {
        const titleForm = document.querySelector('.titleForm');
        const courseDetails = document.querySelector('.courseDetails')
        const courseFees = document.querySelector('.courseFees')
        
        const submitFrm = document.querySelector('form')
        titleForm.value = link.parentElement.parentElement.children[0].textContent;
        courseDetails.value = link.parentElement.parentElement.children[1].textContent;
        courseFees.value = link.parentElement.parentElement.children[2].textContent;
        
        submitFrm.submit();

    })
})


