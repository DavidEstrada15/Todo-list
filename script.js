const Hora= document.getElementById("Hora")
const Fecha= document.getElementById("Fecha")
const Newtodo= document.getElementById("Newtodo")
const ul= document.querySelector("ul")
const form= document.querySelector("form")
const Agregartodo= document.getElementById("Agregartodo")
const Search= document.getElementById("Search")
const SearchInput= document.getElementById("SearchInput")
const eraseAll= document.getElementById("eraseAll")
const CheckAll= document.getElementById("CheckAll")
let select= document.querySelector("select")
let menuactivator= document.getElementById("menuactivator")
let options= document.getElementById("options")
let todos=  JSON.parse(localStorage.getItem("Tareas")) ||[]
let date= new Date()
let mes= date.getMonth() + 1
Fecha.innerHTML= `${date.getDate().toString().padStart(2, "0")}:${mes.toString().padStart(2, "0")}:${date.getFullYear()}`
Hora.innerHTML= `${date.getHours() % 12 == 0 ? "12": date.getHours() %12 }:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")} ${date.getHours() > 11 ? "PM": "AM"}`

setInterval(() => {
    let date= new Date()
 Hora.innerHTML= `${date.getHours() % 12 == 0 ? "12": date.getHours() %12 }:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")} ${date.getHours() > 11 ? "PM": "AM"}` 
 Fecha.innerHTML= `${date.getDate().toString().padStart(2, "0") }:${mes.toString().padStart(2, "0")}:${date.getFullYear()}`
}, 1000); 

SearchInput.addEventListener("input",()=>{
  todos.forEach( (todo, i=1) => {
    i++
    const incluyeono= todo.tarea.toLowerCase().includes(SearchInput.value.toLowerCase())
    document.getElementById(`todo${i}`).style.display= incluyeono ? "flex" : "none";
  });
})

renderizar(todos)

function renderizar(todorenderizar) {
   let i= 1
   SearchInput.value= ""
  todorenderizar.forEach((todo, i)=>{
        const p= document.createElement("p")
        p.textContent= todo.tarea
        let inputcheck= document.createElement("p")
        inputcheck.classList.add("inputcheckclass")
        
    inputcheck.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" id= "todo${i}" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>`
i++
let inputeraser= document.createElement("p")
inputeraser.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`

    inputeraser.classList.add("inputeraserclass")
        const li = document.createElement("li")
        li.id= `todo${i}`
        li.appendChild(inputcheck)
        li.appendChild(p)
        li.appendChild(inputeraser)
        ul.appendChild(li)
        
if ( todo.check == true) {
           li.classList.add("tachado")
           inputcheck.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
</svg>`
localStorage.setItem("Tareas", JSON.stringify(todos))
        } else{
            li.classList.remove("tachado")
            inputcheck.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>`
localStorage.setItem("Tareas", JSON.stringify(todos))
        }
        
        inputcheck.addEventListener("click",()=>{
          cambiarestadocheck()
          function cambiarestadocheck() {
            if (todo.check === false) {
           li.classList.add("tachado")
           todo.check= true
           inputcheck.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
</svg>`
localStorage.setItem("Tareas", JSON.stringify(todos))
        } else{
          todo.check= false
          
            li.classList.remove("tachado")
            inputcheck.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>`
localStorage.setItem("Tareas", JSON.stringify(todos))
          }
          
          
        }

        })
        
        inputeraser.addEventListener("click",()=>{
          todos.splice(todos.indexOf(li))
          li.remove()
          localStorage.setItem("Tareas", JSON.stringify(todos))
          ul.innerHTML= ``
          renderizar(todos)
        })
    })
}


form.addEventListener("submit", (event)=>{
    event.preventDefault()
    let i= 1
    todos.push({
      tarea: Newtodo.value,
      check: false
    })
    ul.innerHTML= ``
   renderizar(todos)
})

eraseAll.addEventListener("click",()=>{
  todos.splice(0)
  ul.innerHTML= ``
  localStorage.setItem("Tareas", JSON.stringify(todos))
})

CheckAll.addEventListener("click",()=>{
  todos.forEach((todo)=>{
    todo.check= true
    ul.innerHTML= ``
    renderizar(todos)
  })
})

menuactivator.addEventListener("click",()=>{
 if (options.style.overflow == "hidden") {
  options.style.overflow= "unset"
  options.style.animation= "desplegar 0.5s ease 0s "
 }else{
  options.style.overflow= "hidden"
  options.style.animation= "cerrar 0.5s ease 0s "
 }
   
})

select.addEventListener("input", ()=>{

  if (select.value == 1) {
    ul.innerHTML= ``
    renderizar(todos)
  }
  else if (select.value == 2) {

   const nuevotodo= todos.filter((todo)=> {
    return todo.check== true
   })
   ul.innerHTML= ``
   renderizar(nuevotodo)
  } else if(select.value == 3){
   const nuevotodo= todos.filter((todo)=> {
    return todo.check== false
   })
   ul.innerHTML= ``
   renderizar(nuevotodo)
  }
  
})