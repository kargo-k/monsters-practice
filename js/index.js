const baseUrl = 'http://localhost:3000/monsters'
const url = 'http://localhost:3000/monsters/?_limit=50'

document.addEventListener('DOMContentLoaded', function (e) {
    loadMonsters()
    renderMonsterForm()

    let currentPage = 1;

    const nextBtn = document.getElementById('forward')
    nextBtn.addEventListener('click', function (e) {
        currentPage++
        fetch(url + `&_page=${currentPage}`)
            .then(resp => resp.json())
            .then(monsters => {
                showMonsters(monsters)
            })
    })

    const backBtn = document.getElementById('back')
    backBtn.addEventListener('click', function (e) {
        currentPage--
        if (currentPage < 1) { currentPage = 1 }
        fetch(url + `&_page=${currentPage}`)
            .then(resp => resp.json())
            .then(showMonsters)
    })

})

function loadMonsters() {
    let currentPage = 1;
    fetch(url + `&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(showMonsters)
}

function showMonsters(all) {
    const div = document.getElementById('monster-container')
    div.innerHTML = ""
    all.forEach(monster => {
        let h2 = document.createElement('h2')
        h2.innerText = monster.id + ' ' + monster.name
        div.appendChild(h2)

        let age = document.createElement('h4')
        age.innerText = monster.age
        div.appendChild(age)

        let desc = document.createElement('p')
        desc.innerText = monster.description
        div.appendChild(desc)
    });
}

function renderMonsterForm() {
    const formDiv = document.getElementById('create-monster')

    let dinoform = document.createElement('form')
    formDiv.appendChild(dinoform)

    let nameInput = document.createElement('input')
    nameInput.id = 'name'
    nameInput.placeholder = 'Name'
    dinoform.appendChild(nameInput)

    let ageInput = document.createElement('input')
    ageInput.id = 'age'
    ageInput.placeholder = 'Age'
    dinoform.appendChild(ageInput)

    let descInput = document.createElement('input')
    descInput.id = 'description'
    descInput.placeholder = 'Description'
    dinoform.appendChild(descInput)

    let submitBtn = document.createElement('button')
    submitBtn.innerText = 'Create Monster'
    dinoform.appendChild(submitBtn)

    dinoform.addEventListener('submit', createDino)
}

function createDino(e) {
    e.preventDefault()
    return fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            name: e.target[0].value,
            age: e.target[1].value,
            description: e.target[2].value
        })
    })
}