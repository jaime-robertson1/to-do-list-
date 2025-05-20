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

// NOTE - Function to display all tasks in the list 
function listTasks() {
    console.log('\n Your TO-DO List:') // Print list header 
    if(todos.length === 0) {           // If there are no tasks
        console.log('No tasks found')  // Inform the user that list is empty 
    } else {                           // If there are tasks 
        todos.forEach((task, idx) => { // For each task in the array
            const status = task.done ? 'Complete' : 'Not complete' // Determine status text 
            console.log(`${idx + 1}. (${status}) ${task.text}`)    // Print task number, status and description 
        })
    }
    showMenu()    // Show menu again after listing tasks 
}


// NOTE - Function to add a new task to the list 
function addTask() {
    rl.question('\n Enter the task: ', (task) => { // Prompt user to enter the task description
        if(task.trim() === '') {    // If input is empty or only spaces 
            console.log('Task cannot be empty.') // Show error message 
        } else {
            todos.push({text: task, done: false}) // Add a new task object (not completed by default)
            saveTasks()                           // Save updated tasks to file
            console.log('Task added!')            // Confirm addition 
        }
        showMenu()                                // Show menu again 
    })
}

// NOTE - Function to prompt the user to select a task to mark as completed
function promptMarkTaskAsDone() {
    if(todos.length === 0) {                        // If there are no task
        console.log('\ No task to mark as done.')   // Inform user
        return showMenu()
    }
    console.log('\n Select the number of tasks to mark as completed:') // Print prompt header 
    todos.forEach((task, idx) => {                                     // List all tasks with their numbers 
        const status = task.done ? 'Completed' : 'Not completed'       // Status as text
        console.log(`${idx + 1}. (${status}) ${task.text}`)                 // Print each task
    })
    rl.question('\n Task number: ', (num) => { // Prompt for task number 
        markTaskAsDone(num)                    // Pass input to markTaskAsDone function 
    })
}

// NOTE - Function to mark the selected task as completed 
function markTaskAsDone(num) {
    let idx = parseInt(num) - 1 // Convert user input to array index
    if (todos[idx]) {           // If a task exists at that index
        todos[idx].done = true  // Mark the task as completed 
        saveTasks()             // Save changes to file 
        console.log('Task marked as completed!') // Confirm completion 
    } else {
        console.log('Invalid task number.')      // If input invalid, show error
    }
    showMenu()
}