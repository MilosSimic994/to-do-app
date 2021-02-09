const list = document.querySelector('.list ul')
const newToDo = document.getElementById('new-input')
const form = document.querySelector('.new-todo')
const clear = document.querySelector('.clear')

const todos = [];



function updataDOM() {
if(newToDo.value.trim() !== '') {
    const element = document.createElement('li')
    element.dataset.id = Math.random() * 100

    element.innerHTML = `
    <div class="o"></div> 
    ${newToDo.value}
    <img class="del" src="/images/icon-cross.svg">
    `

const del = element.querySelector('.del');
const check = element.querySelector('.o')
del.addEventListener('click', (e)=> {
    const element = e.target.parentElement;
    element.remove()
})
check.addEventListener('click', (e)=> {
    
    const element = e.target.parentElement 
    element.dataset.completed = 'completed'
    e.target.classList.toggle('check');
    element.classList.toggle('decoration')
    
})

list.appendChild(element)
newToDo.value = ''
} 
 }





form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const todo = {
        completed: false,
        task: newToDo.value,
        id: Math.random() * 100
    }

    todos.push(todo)
    updataDOM()

    console.log(list); 
    console.log(todos);
})

clear.addEventListener('click', ()=> {
    const items = document.querySelectorAll('.list ul li')
    items.forEach(item => {
        if(item.dataset.completed === 'completed') {
            item.remove()
        }
    })
    console.log(items);
})


//completed treba resiti ostaje i kad se odstiklira