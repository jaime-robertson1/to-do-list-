// NOTE - Import the readline module for handling command line input/output 
const readline = require('readline')

// Import the fs (filesystem) module for reading/writing files 
const fs = require('fs')

// NOTE - Define the file where tasks will be saved 
const FILE = 'tasks.json'

// Initialise an empty array to store tasks 
let todos = []

// NOTE - Check if the tasks.json file exists
if(fs.existsSync(FILE)) {
    try{
        // If file exists, read it's contents (sync)
        const data = fs.readFileSync(FILE, utf8)
        // Parse JSON string into the todos array
        todos = JSON.parse(data)
    } catch(e) {
        // If there is any error. Start with an empty array
        todos = []
    }
}