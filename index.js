let todos = [
    {
        "id":1,
        "title":"Complete online javascript course",
        "completed":false
    },
    {
        "id":2,
        "title":"10 minute meditation",
        "completed":true
    },
    {
        "id":3,
        "title":"Read fro 1 hour",
        "completed":false
    },
    {
        "id":4,
        "title":"Pick up groceries",
        "completed":false
    },
]
let addTodo = document.getElementById('addTodo')
let todoCount = document.getElementById('todo_count')
let todosLeft = todos.filter(todo => todo.completed === false).length
todoCount.textContent =  todosLeft + ` ${todosLeft === 1 ? 'todo' : 'todos'}  left`
const todosContainer = document.getElementById('todos');

addTodo.addEventListener('submit', addTodoItem)

for(let i = 0; i < todos.length; i++){
    todosContainer.innerHTML += `<div class="todo"><div class="todo__title"><div  id="todo${todos[i].id}" class="check-box ${todos[i].completed ? "checked-true" : ""}">${todos[i].completed ? `<img src='./images/icon-check.svg' id='image${todos[i].id}' alt=''>` : ""}</div><p id="todo-para${todos[i].id}" class="${todos[i].completed ? 'todo__complete' : ""}">${todos[i].title}</p></div><div class="todo__action"><button id="todo__item__${todos[i].id}"><img src="./images/icon-cross.svg" alt=""></button></div></div>`
}

init()

function updateUI(id, completed){
    let prevTodo = document.getElementById(`todo${id}`)
    let todoTitle = document.getElementById(`todo-para${id}`)
    if(completed === false){
        let checkImg = document.getElementById(`image${id}`)
        prevTodo.removeChild(checkImg);
        prevTodo.className = "check-box"

        todoTitle.className = ""

    }else{
        
        todoTitle.className += ' todo__complete'

        let checkedImage = document.createElement('img')
        checkedImage.src = './images/icon-check.svg'
        checkedImage.id = `image${id}`
        prevTodo.appendChild(checkedImage)
        prevTodo.className += " checked-true"
    }
}

function addTodoItem(e){
    e.preventDefault();
    // let completed = document.getElementById('new_todo_complete')
    let title = document.getElementById('new_todo_title').value
    let todo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        title,
        completed:false
    }
    todos.push(todo)
    todosContainer.innerHTML += `<div class="todo"><div class="todo__title"><div  id="todo${todo.id}" class="check-box ${todo.completed ? "checked-true" : ""}">${todo.completed ? `<img src='./images/icon-check.svg' id='image${todo.id}' alt=''>` : ""}</div><p id="todo-para${todo.id}" class="${todo.completed ? 'todo__complete' : ""}">${todo.title}</p></div><div class="todo__action"><button id="todo__item__${todo.id}"><img src="./images/icon-cross.svg" alt=""></button></div></div>`
    let leftTodos = todos.filter(todo => todo.completed === false)
    console.log(leftTodos.length)
    todoCount.textContent = `${leftTodos.length} ${leftTodos.length === 1 ? 'todo' : 'todos'} left`
    console.log(todos)
    init()
}

function init(){
    
    // Set eventListeners for each todo
    for(let i = 1; i <= todos.length; i++){
        document.getElementById(`todo${i}`).addEventListener('click', toggleComplete)
    }

    for(let i = 0; i < todos.length; i++){
        try{
            document.getElementById(`todo__item__${todos[i].id}`).addEventListener('click', e => {
                let id = e.target.parentElement.id
                id = id.split('__')[2]
                let removedTodo = todos.find(todo => todo.id == id)
                todos = todos.filter(todo => todo.id != id)
                let leftTodos = todos.filter(todo => todo.completed === false)
                todoCount.textContent = `${leftTodos.length} ${leftTodos.length === 1 ? 'todo' : 'todos'}`
                console.log(todos)
                removeTodoFromDOM(removedTodo.id)
            })
        }catch(e){
            console.log('Some sort of error!')
        }
    }

    //EventListener Callback
    function toggleComplete(e) {
        let id = e.target.id.split('image')[1] ? e.target.parentElement.id : e.target.id
        id = id.split('todo')[1]
        console.log(id)
        // let newTodos = todos.filter(todo => todo.id !== Number(id))
        let currentTodo = todos.find(todo => todo.id === Number(id))

        if(currentTodo !== undefined){
            console.log(currentTodo.id)
            currentTodo.completed = !currentTodo.completed
            let {idNumber} = currentTodo
            idNumber = Number(idNumber) - 1
            todos[idNumber - 1 <= 0 ? 0 : idNumber - 1] = currentTodo
            let leftTodos = todos.filter(todo => todo.completed === false)
            todoCount.textContent = `${leftTodos.length} ${leftTodos.length === 1 ? 'todo' : 'todos'} left`
            console.log(currentTodo)
            // console.log(todos[0])
            updateUI(id, currentTodo.completed);
        }
        
    }
}

function removeTodoFromDOM(todoID){
    let todo = document.getElementById(`todo${todoID}`)
    todo = todo.parentElement.parentElement
    todosContainer.removeChild(todo)
}