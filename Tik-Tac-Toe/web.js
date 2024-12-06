let boxes = document.querySelectorAll(".box");
let win = document.querySelector(".winname");
let newgame = document.querySelector(".newgame");

const winpattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let count = 0;

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
        count++;

        if(count === 9)
        {
            win.classList.remove("hide");
            win.innerText = "Draw";
        }

        let check = checkwinner();

        if(check)
        {
            disable();
        }
    })
});

newgame.addEventListener("click",()=>{
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("highlight");
    }
    win.classList.add("hide");
    turn = 1;
    count = 0;
})

const checkwinner = () => {
    for(let pattern of winpattern)
    {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "")
        {
            if(pos1 === pos2 && pos2 === pos3)
            {
                boxes[pattern[0]].classList.add("highlight");
                boxes[pattern[1]].classList.add("highlight");
                boxes[pattern[2]].classList.add("highlight");
                showwinner();
                return true;
            }
        }
    }
    return false
};

const disable = () =>{
    for(let box of boxes)
    {
        box.disabled = true;
    }
};

const showwinner = () =>{
    win.classList.remove("hide");
    if(turn)
    {
        win.innerText = "Winner O";
    }
    else
    {
        win.innerText = "Winner X";
    }
};
