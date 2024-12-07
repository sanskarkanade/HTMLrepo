let keys = document.querySelectorAll(".box");
let exp = document.querySelector(".equation");

keys.forEach((box) => {
    box.addEventListener("click", () => {
        let value = box.textContent.trim();
        if (value === "<-") {
            exp.textContent = exp.textContent.slice(0, -1);
        }

        else if (value === "=") {
            try {
                exp.textContent = eval(exp.textContent);
            } catch {
                exp.textContent = "Error";
            }
        }
        else {
            exp.textContent += value;
        }
    });
});
