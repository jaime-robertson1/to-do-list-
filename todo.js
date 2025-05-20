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

// NOTE - Create a readline interface for command line interface 
const rl = readline.createInterface({
    input: process.stdin, // Set standard input (keyboard) as input source 
    output: process.stdout // Set standard output (keyboard) as output target
})

// TODO - Function to display the main menu options 
function showMenu() {
    console.log('\n To-Do List App ===') // Print the app header 
    console.log('1. Show tasks')         // Option 1 : Show all tasks 
    console.log('2. Add Task')           // Option 2: Add a new task
    console.log('3. Mark Task as Done')  // Option 3: Mark a task as completed 
    console.log('4. Delete a Task')      // Option 4: Delete a task 
    console.log('5. Exit')               // Option 5: Exit the app
    rl.question('\n Choose an option (1-5): ', handleMenu) // Prompt user for menu choice 
}

// NOTE - Function to save tasks array to the task.json file 
function saveTasks() {
    fs.writeFileSync(FILE, JSON.stringify(todos, null, 2)) // Write the todos array as pretty JSON

}

// TODO - Function to handle the menu option entered by the user 
function handleMenu(choice) {
    switch(choice.trim()) {  // Use the trimmed input for comparision 
        case '1': 
            listTasks()      // If '1', show all tasks 
            break 

        case '2':
            addTask()        // If '2', add a new task
            break

        case '3':
            promptMarkTaskAsDone()  // If '3', mark a task as completed 
            break 

        case '4':
            promptDeleteTask()      // If '4', delete a task 
            break 

        case '5':
            console.log('Goodbye!') // If '5', print goodbye and close the app
            rl.close()              // Close readline interface 
            break
        default:
            console.log('Invalid choice. Try again.') // If not 1-5, show error message 
            showMenu()                                // Show menu again
            break
            
    }
}