const notes = require("./notes.js")
const chalk = require("chalk")
const yargs = require("yargs")


yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "note title",
            demandOption: true,
            type: "stirng"
        },
        description: {
            describe: "title descirption",
            demandOption: true,
            type: "stirng"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.description)
    }
})

yargs.command({
    command: "remove",
    describe: "removing a note",
    builder: {
        title: {
            describe:"title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
      notes.removeNotes(argv.title)
    }
})


yargs.command({
    command: "read",
    describe: "reading a note",
    builder: {
        title: {
            describe:"title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
       notes.readNote(argv.title);
    }
})

yargs.command({
    command: "list",
    describe: "listing a note",
    handler() {
       notes.listNotes();
    }
})
yargs.parse()

