import React, { useState } from "react"


function EditBounty(props) {

    // console.log(props)

    const initData = {
        firstName: props.firstName,
        lastName: props.lastName,
        living: props.living,
        bountyAmount: props.bountyAmount,
        type: props.type,
        _id: props._id
    }

    const [bountyInfo, setBountyInfo] = useState(initData)

    function handleChange(event) {
        const { name, value } = event.target
        setBountyInfo((prevBountyInfo) => ({
            ...prevBountyInfo, [name]: value
        })
        )
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.updateBounty(bountyInfo._id, bountyInfo)
        setBountyInfo(initData)
        props.setEditState(false)
    }


    // console.log(bountyInfo)

    return (
        <div>
            <div>Edit Bounty Information</div>
            <form onSubmit={handleSubmit}>
                <input name="firstName"
                    value={bountyInfo.firstName}
                    placeholder="First Name"
                    onChange={handleChange}
                    className="entry-field"
                >
                </input>
                <input name="lastName"
                    value={bountyInfo.lastName}
                    placeholder="Last Name"
                    onChange={handleChange}
                    className="entry-field"
                >
                </input>
                <input name="bountyAmount"
                    value={bountyInfo.bountyAmount}
                    placeholder="Bounty Amount"
                    type="number"
                    onChange={handleChange}
                    className="entry-field"
                >
                </input>
                <select
                        onChange={handleChange}
                        name="type"
                        type="checkbox"
                        className="entry-field"
                    // onChange={toggleView}
                    >
                        <option name="type">Choose Type</option>
                        <option name="type" value="Jedi">Jedi</option>
                        <option name="type" value="Sith">Sith</option>
                        <option name="type" value="Other">Other</option>
                    </select>
                {/* <input name="type"
                    value={bountyInfo.type}
                    placeholder="Type"
                    onChange={handleChange}
                    className="entry-field"
                >
                </input> */}

                <div style={{ margin: "10px" }}>
                    <button>SUBMIT</button>
                </div>

            </form>
            <hr></hr>
            
        </div>
    )
}


export default EditBounty