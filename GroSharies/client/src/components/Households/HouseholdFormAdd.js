import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

// Context
import { HouseholdContext } from "../../providers/HouseholdProvider";
// =========================== IMPORTS END ===========================


const HouseholdFormAdd = () => {
    const history = useHistory();
    const { saveHousehold } = useContext(HouseholdContext);
    const [isLoading, setIsLoading] = useState(false);
    const [household, setHousehold] = useState({
        name: ""
    });
    
    // Handles updating the state of household as the user updates the form
    const handleInput = e => {
        const newHousehold = { ...household };
        newHousehold[e.target.id] = e.target.value;
        setHousehold(newHousehold);
    }

    const handleSave = () => {
        if(household.name === "") return window.alert("Please enter a household name");

        // Disables the save button until finished
        setIsLoading(true)

        // Save the household object to the database
        saveHousehold({
            name: household.name
        })
        .then(() => history.push("/household"));
    }

    return (
        <>
            <form className="householdForm">
                <h2 className="householdForm-title">Add a new household</h2>

                {/* Name Input */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Household Name: </label>
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

                {/* Save Button */}
                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                    event.preventDefault();
                    handleSave();
                    }}
                >
                    Add Household
                </button>
            </form>
        </>
    );
}

export default HouseholdFormAdd