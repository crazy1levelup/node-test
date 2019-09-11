const fs = require('fs')
const chalk = require("chalk")


const addNote = function(title, description) {
    const notes = loadNotes()
    const duplicateNote = notes.find(x => x.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            description: description
        })
        saveNotes(notes);
        console.log(chalk.bgGreen("Note Added"))
    }else {
        console.log(chalk.bgRed("Duplicate"))
    }
  
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    }catch(e) {
        return []
    }
}
const removeNotes = function (title) {
    console.log(title)
    const notes = loadNotes();
    const filteredData = notes.filter(x => (x.title !== title ));
    if(filteredData.length < notes.length) {
        console.log(chalk.bgGreen("Note removed"))
    }else {
        console.log(chalk.bgRed("No note found"))
    }
    saveNotes(filteredData)
}

const listNotes = function() {
    console.log(chalk.bgGreen("Your notes: "))
    const notes = loadNotes();
    return notes.forEach(x => console.log(x.title));
}

const readNote = function(title) {
    const notes = loadNotes();
    const theNote = notes.find(x => x.title === title)

    debugger
    if(theNote) {
        console.log("Title " + chalk.green(theNote.title) + " Desc: " + theNote.description)

    }else {
        console.log(chalk.red("no note found"))
    }
}




module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote:readNote
};