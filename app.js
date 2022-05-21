const RESULTS = document.querySelector('#npcNames')
const INPUT = document.querySelector('#searchQuery')
const TEXTAREA = document.querySelector("textarea");

function populateField(regex){
    RESULTS.innerHTML = ''
    let response = ''
    allNPC.forEach(i => {
        response += ((i.search(regex) > -1)? `<a href="https://osrs.wiki/${i}" target="_blank">${i}</a></br>` :'')
    })
    RESULTS.innerHTML = (response ==''?`\n No NPC found with "${INPUT.value}" in their name, try something different \n`:response)
    console.log(RESULTS.innerHTML)
}

function searchQuery (query){
    let temp = {}
    let out = ''
    query = query.split(' ').join('')
    let regex = query.split('')
    regex.forEach((element) => {
        temp[element] = (temp[element] > 0)? temp[element] +1:1;
    })
    for (key in temp){
        let tempkey = key
        console.log(key)
        tempkey = (key.search(/[[\]\\\^\*\+\?\{\}\|\(\)\$\.]/) == 0)?'\\' + key: key
        out += `((?=.*${tempkey}){${temp[key]}})`
        console.log(out)
    }
    regex = `\\b${out}\\w+\\b`

    return new RegExp(regex, 'i')
    
}

function renderField(){ 
    populateField(searchQuery(INPUT.value));
}

INPUT.addEventListener('change', ()=>{
    renderField()
})
