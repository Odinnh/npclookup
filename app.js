const RESULTS = document.querySelector('#npcNames')
const INPUT = document.querySelector('#searchQuery')
const TEXTAREA = document.querySelector("textarea");

function populateField(regex){
    RESULTS.innerHTML = ''
    let test = ''
    allNPC.forEach(i => {
        test += ((i.search(regex) > -1)? i + '\n' :'')
    })
    RESULTS.innerHTML = (test ==''?`\n No NPC found with "${INPUT.value}" in their name, try something different \n`:test)
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
    TEXTAREA.style.height = '0' + "px";
    populateField(searchQuery(INPUT.value));
    const height = TEXTAREA.scrollHeight;
    TEXTAREA.style.height = height + "px";
}

INPUT.addEventListener('change', ()=>{
    renderField()
})
