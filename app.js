const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Task = require("./models/taskSchema")
const port = process.env.PORT || 3000

app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))

app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).render("index", { tasks })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post("/", async (req, res) => {
    if (req.query.method === "create") {
        try {
            const task = await Task.create(req.body)
            res.status(200).redirect("/")
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    if (req.query.method === "update") {
        try {
            const id = req.query.id
            const task = await Task.findByIdAndUpdate(id, req.body)
            res.status(200).redirect("/")
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    if (req.query.method === "delete") {
        try {
            const id = req.query.id
            const task = await Task.findByIdAndDelete(id)
            res.status(200).redirect("/")
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    if (req.query.method === "deleteAll") {
        try {
            const task = await Task.find({})
            for (let i = 0; i < task.length; i++) {
                if (task[i].done === true) {
                    const id = task[i].id
                    await Task.findByIdAndDelete(id)
                }
            }
            res.status(200).redirect("/")
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
})




mongoose
    .connect(
        "mongodb+srv://alihassanhaedr:c4a@cluster0.ue5ezcc.mongodb.net/2024todo_list?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });