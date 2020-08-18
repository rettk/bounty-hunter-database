const express = require("express")
const bountyRouter = express.Router()
const Bounty = require("../models/bounty.js")

bountyRouter.get("/", (req, res, next) => {
    // console.log(bounties)
    Bounty.find((err, items) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

bountyRouter.post("/", (req, res, next) => {
    console.log(req.body)
    const newBounty = new Bounty(req.body)
    newBounty.save((err, savedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedItem)
    })
    // res.send(`${req.body.firstName} has been added for a $${req.body.bountyAmount} bounty.`)
})

bountyRouter.delete("/:deleteId", (req, res, next) => {
    Bounty.findOneAndDelete({ _id: req.params.deleteId }, (err, deletedBounty) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedBounty.name} from the database.`)
    })

})

bountyRouter.put("/:updateId", (req, res, next) => {
    Bounty.findByIdAndUpdate({ _id: req.params.updateId }, req.body, { new: true },
        (err, updatedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBounty)
        })
})

bountyRouter.get("/search/type", (req, res, next) =>{
    Bounty.find({type: req.query.type}, (err, bounties) =>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(bounties)
    })
})


module.exports = bountyRouter