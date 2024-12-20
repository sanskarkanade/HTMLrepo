let text = document.querySelector("#text");
let addbtn = document.querySelector("#addbtn");
let showtodo = document.querySelector(".showtodo");


addbtn.addEventListener("click" , () => {
    if(text.value != "")
    {
    let element = document.createElement("div")
    let delbtn = document.createElement("button")
    let checkbox = document.createElement("input")

    checkbox.setAttribute("type" , "checkbox")
    checkbox.setAttribute("id" , "todo")



    delbtn.innerText = "Delete"
    delbtn.setAttribute("class" , "dbtn")

    
       

    element.setAttribute("class" , "eachtodo")


    delbtn.addEventListener("click" , () => {
        showtodo.removeChild(element)
    })

    let textcontent = document.createTextNode(text.value)

    element.appendChild(checkbox)
    element.appendChild(textcontent)
    element.appendChild(delbtn)
    showtodo.appendChild(element)

    text.value = ""

}})