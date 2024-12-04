let boxes = document.querySelectorAll(".box");

let turn = 1
boxes.forEach((box) => {
    box.addEventListener("click" , ()=>
    {
        if(turn)
        {
            box.innerText = "X";
            turn = 0;
        }
        else
        {
            box.innerText = "O";
            turn = 1;
        }
        box.disabled = true;
    })
});
