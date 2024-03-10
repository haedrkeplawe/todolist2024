let boxs = document.querySelectorAll(".container .boxs .box")
let btns = document.querySelectorAll(".fillter button")

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        btns.forEach(btn => {
            btn.classList = ""
        })
        btn.classList = "active"
        let state = "open"
        if (btn.id === "all") {
            state = "open"
        } else if (btn.id === "active") {
            state = "active"
        } else {
            state = "completed"
        }
        boxs.forEach(box => {
            box.style.display = "none";
            if (state === "open") {
                box.style.display = "flex";
            } else if (state === "active") {
                if (!box.classList.contains("completed")) {
                    box.style.display = "flex";
                }
            } else if (state === "completed") {
                if (box.classList.contains("completed")) {
                    box.style.display = "flex";
                }
            }
        });
    })
});
