/*  design

main section: top part has form to enter new bounties.
Next part lists first name of bounties with the amount next to them.
Button expands view and has edit/delete/mark killed buttons.

recent kills: section with recent "kills" - lists most recent kills and the date killed, recent first

*/

import React, { useState, useEffect } from "react"
import EnterBounty from "./components/EnterBounty"
import axios from "axios"
import Bounty from "./components/Bounty"
import { set } from "mongoose"

function App() {


    let [bounties, setBounties] = useState([])
    let [showTerminated, setShowTerminated] = useState(false)

    useEffect(() => {
        getAll()

    }, [])

    function getAll() {
        return (
            axios.get("/bounty")
                .then(res => {
                    setBounties(res.data)
                })
                .catch(err => console.log(err))
        )
    }

    function addBounty(bounty) {
        return (
            axios.post("/bounty", bounty)
                .then(res => setBounties(prevBounties =>
                    [...prevBounties, res.data]))
                .catch(err => console.log(err))

        )
    }

    function deleteBounty(bountyId) {
        return (
            axios.delete(`/bounty/${bountyId}`)
                // .then(res => console.log(res.data))
                .then(res => {
                    setBounties(prevBounties => prevBounties.filter(movie => movie._id !== bountyId))
                })
                .catch(err => console.log(err))
        )
    }

    function updateBounty(bountyId, bountyInfo) {

        return (
            axios.put(`/bounty/${bountyId}`, bountyInfo)
                // .then(res => console.log(res.data))
                .then(res => setBounties(prevBounties =>
                    prevBounties.map(bounty => bounty._id !== res.data._id ? bounty : res.data)))
                .catch(err => console.log(err))
        )
    }

    function toggleLiving(bountyId) {
        const index = bounties.findIndex(item => item._id === bountyId)
        const status = bounties[index].living
        return (
            axios.put(`/bounty/${bountyId}`, { living: !status })
                // .then(res => console.log(res.data))
                .then(res => setBounties(prevBounties =>
                    prevBounties.map(bounty => bounty._id !== res.data._id ? bounty : res.data)))
                .catch(err => console.log(err))
        )
    }

    function queryType(event) {
        if (event.target.value === "all") {
            getAll()
        } else
            return (
                axios.get(`bounty/search/type?type=${event.target.value}`)
                    .then(res => setBounties(res.data))
                    .catch(err => console.log(err))
            )

    }

    // function handleFilter(e) {
    //     // console.log(e.target.value)
    //     if (e.target.value === "reset") {
    //         getMovies()
    //     } else {
    //         axios.get(`/movies/search/genre?genre=${e.target.value}`)
    //             .then(res => setMovies(res.data))
    //             .catch(err => console.log(err))

    //     }
    // }

    function toggleView(event) {
        return (
            setShowTerminated(prevShowTerminated => !prevShowTerminated)
        )
    }

    // console.log(showTerminated)


    const bountiesMinusTerminated = bounties.map(bounty =>
        bounty.living &&
        <Bounty
            key={bounty._id}
            firstName={bounty.firstName}
            lastName={bounty.lastName}
            bountyAmount={bounty.bountyAmount}
            living={bounty.living}
            type={bounty.type}
            _id={bounty._id}
            deleteBounty={deleteBounty}
            toggleLiving={toggleLiving}
            updateBounty={updateBounty}
        />
    )

    const allBounties = bounties.map(bounty =>
        <Bounty
            key={bounty._id}
            firstName={bounty.firstName}
            lastName={bounty.lastName}
            bountyAmount={bounty.bountyAmount}
            living={bounty.living}
            type={bounty.type}
            _id={bounty._id}
            deleteBounty={deleteBounty}
            toggleLiving={toggleLiving}
            updateBounty={updateBounty}
        />)

    return (
        <div className="container">

            <div className="fixed">

                <h1 >The Bounty Hunter's Database</h1>
                <EnterBounty addBounty={addBounty} />
                <div className="inline">
                    <h3 id="display-terminated">Display Terminated?</h3>&nbsp;
                <input
                        type="checkbox"
                        className="checkbox"
                        onChange={toggleView}
                    >
                    </input>
                    <br></br>
                </div>
                <hr></hr>
                <div className="inline">
                    <h3 id="type-filter">Filter Type?</h3>&nbsp;
                    <br></br>
                    <div>
                        <select
                            type="checkbox"
                            className="field"
                            onChange={queryType}
                            value={bounties.type}
                        >
                            <option value="all">All</option>
                            <option value="Jedi">Jedi</option>
                            <option value="Sith">Sith</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <br></br>
                </div>
            </div>

            <div>
                {showTerminated ? allBounties : bountiesMinusTerminated}
            </div>

            <div id="picture">

            </div>


        </div>
    )
}

export default App



