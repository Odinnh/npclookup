const RESULTS = document.querySelector('#npcNames')
const INPUT = document.querySelector('#searchQuery')
const TEXTAREA = document.querySelector("textarea");

const WIKI = MediaWikiJS('https://oldschool.runescape.wiki')
let allNPC = []
let options = {
    action: 'query',
    list: 'categorymembers',
    cmtitle: 'Category:Non-player_characters',
    cmlimit: 'max',
    cmcontinue: ''
}

WIKI.send(options, continueQuery)

function continueQuery(data) {
    options.cmcontinue = data.continue?.cmcontinue
    for (let npc of data.query?.categorymembers) {
        allNPC.push(npc.title)
    }
    if (options.cmcontinue !== undefined) {
        WIKI.send(options, continueQuery)
    }

    INPUT.value = 'Wise Old Man'
    INPUT.focus();
    renderField()
    return

}

function populateField(regex) {
    RESULTS.innerHTML = ''
    let response = ''
    allNPC.forEach(i => {
        if (allNPC[i] == '? ? ? ?') console.log('found him')
        response += ((i.search(regex) > -1) ? `<a href="https://osrs.wiki/${i}" target="_blank">${i}</a></br>` : '')
    })
    RESULTS.innerHTML = (response == '' ? `\n No NPC found with "${INPUT.value}" in their name, try something different \n` : response)
}

function searchQuery(query) {
    let temp = {}
    let out = ''
    query = query.split(' ').join('')
    let regex = query.split('')
    regex.forEach((element) => {
        temp[element] = (temp[element] > 0) ? temp[element] + 1 : 1;
    })
    for (key in temp) {
        let tempkey = key
        tempkey = (key.search(/[[\]\\\^\*\+\?\{\}\|\(\)\$\.]/) == 0) ? '\\' + key : key
        out += `((?=.*${tempkey}){${temp[key]}})`
    }
    regex = `\\b${out}\\w+\\b`

    return new RegExp(regex, 'i')

}

function renderField() {
    populateField(searchQuery(INPUT.value));
}

INPUT.addEventListener('change', () => {
    renderField()
})
