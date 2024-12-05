let boxes = document.querySelectorAll(".box");

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

         checkwinner();
    })
});

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
                console.log("win");
            }
        }
    }
};
