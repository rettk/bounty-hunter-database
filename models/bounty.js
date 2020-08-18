const mongoose = require("mongoose")
const Schema = mongoose.Schema


//Blueprint

const bountySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    bountyAmount: {
        type: Number,
        required: true
    },
    living: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Jedi", "Sith", "Other"]
    }
    // _id: {
    //     type: String,
    //     required: true,
    // }
})

module.exports = mongoose.model("Bounty", bountySchema)
