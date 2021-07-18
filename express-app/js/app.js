document.querySelector('.cube-list').addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('more')) {
        let description = target.parentNode.querySelector('.cube-description')
        console.log(description)
        if (description.style.display === '') {
            description.style.display = 'block'
            target.textContent = 'Hide'
        } else {
            description.style.display = ''
            target.textContent = 'See more'
        }
    }
})