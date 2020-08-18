import React, { useState } from "react"
import EditBounty from "./EditBounty"

function Bounty(props) {

    const [editState, setEditState] = useState(false)

    function toggleEdit() {
        setEditState(prevEditState => !prevEditState)
    }

        return (
        <div className="bounty">

            <div className="inline">

                <h2 style={{ textDecoration: !props.living && "line-through" }}>{props.firstName}&nbsp;</h2>
                <h2 style={{ textDecoration: !props.living && "line-through" }}>{props.lastName}</h2>
                <h2>&nbsp;&nbsp;&nbsp;&nbsp;${props.bountyAmount}</h2>

            </div>

            <h3 style={{ color: props.living ? "green" : "red" }}>
                {props.living ? "Active" : "Terminated"}
            </h3>
            <div className="inline">
                <h3>Type: {props.type}</h3>&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    onClick={toggleEdit}
                    className="button"
                    style={{ color: "blue" }}>
                    EDIT Details
                </button>&nbsp;&nbsp;&nbsp;&nbsp;

                <button
                    onClick={() => props.toggleLiving(props._id)}
                    className="button"
                    style={{ color: "green" }}>
                    {props.living ? "MARK Terminated" : "MARK Active"}
                </button>

                &nbsp;&nbsp;&nbsp;&nbsp;<button
                    onClick={() => props.deleteBounty(props._id)}
                    className="button" style={{ color: "red" }}>
                    DELETE
                </button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            {editState && <EditBounty {...props} setEditState={setEditState}/>}


        </div>
    )
}

export default Bounty