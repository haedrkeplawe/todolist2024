const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    tasck: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Task", TaskSchema)