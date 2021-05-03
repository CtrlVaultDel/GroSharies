import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HouseholdContext } from "../../providers/HouseholdProvider";

const HouseholdFormEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const { updateHousehold, getHousehold } = useContext(HouseholdContext);
    const [isLoading, setIsLoading] = useState(false);
    const [household, setHousehold] = useState({
        id: 0,
        name: ""
    });
    
    useEffect(() => {
        getHousehold(id)
        .then(resp => setHousehold(resp.household))
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    // Handles updating the state of household as the user updates the form
    const handleInput = e => {
        const newHousehold = { ...household };
        newHousehold[e.target.id] = e.target.value;
        setHousehold(newHousehold);
    }

    const handleSave = () => {
        if(household.name === "") return window.alert("Please enter a household name");

        // Disables the update button until finished
        setIsLoading(true)

        // Update the existing household in the database
        updateHousehold({
            id: household.id,
            name: household.name
        })
        .then(() => history.push("/household"));
    }

    return (
        <>
            <form className="householdForm">
                <h2 className="householdForm-title">Update your household</h2>

                {/* Name Input */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Name: </label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleInput}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Name"
                            value={household.name}
                        />
                    </div>
                </fieldset>

                {/* Update Button */}
                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                    event.preventDefault();
                    handleSave();
                    }}
                >
                    Update Household
                </button>
            </form>
        </>
        );
}

export default HouseholdFormEdit