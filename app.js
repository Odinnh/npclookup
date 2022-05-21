const RESULTS = document.querySelector('#npcNames')
const INPUT = document.querySelector('#searchQuery')

function populateField(regex){
    RESULTS.innerHTML = ''
    let test = ''
    allNPC.forEach(i => {
        test = ((i.search(regex) > -1)? i + '\n' :'')
        RESULTS.innerHTML += (test)
    })
}

function searchQuery (query){
    let temp = {}
    let out = ''
    let regex = query.split('')
    regex.forEach((element) => {
        temp[element] = (temp[element] > 0)? temp[element] +1:1;
    })
    for (key in temp){
        out += `((?=.*${key}){${temp[key]}})`
    }
    console.log(out)
    regex = `\\b${out}\\w+\\b`
    console.log(regex)

    return new RegExp(regex)
    
}


INPUT.addEventListener('change', () => {
    populateField(searchQuery(INPUT.value));
})