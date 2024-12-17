let text = document.querySelector("#text");
let addbtn = document.querySelector("#addbtn");
let showtodo = document.querySelector(".showtodo");


addbtn.addEventListener("click" , () => {
    let element = document.createElement("div")
    let delbtn = document.createElement("button")
    let checkbox = document.createElement("input")

    checkbox.setAttribute("type" , "checkbox")

    delbtn.innerText = "Delete"

    delbtn.addEventListener("click" , () => {
        showtodo.removeChild(element)
    })

    let textcontent = document.createTextNode(text.value)

    element.appendChild(checkbox)
    element.appendChild(textcontent)
    element.appendChild(delbtn)
    showtodo.appendChild(element)

})