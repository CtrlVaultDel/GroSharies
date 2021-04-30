import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HouseholdContext } from "../../providers/HouseholdProvider";

const HouseholdForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const { saveHousehold, getHousehold } = useContext(HouseholdContext);
    const [isLoading, setIsLoading] = useState(false);
    const [household, setHousehold] = useState({
        id: 0,
        name: ""
    });

    // If the user is editing an existing household, grab the original value(s)
    useEffect(() => {
        if(id){
            getHousehold()
            .then(setHousehold);
        }
    }, []);

    // Handles updating the state of household as the user updates the form
    const handleInput = event => {
        const newHousehold = { ...household };
        newHousehold[event.target.id] = event.target.value;
        setHousehold(newHousehold);
    }

    const handleSave = () => {
        if(household.name === "") return window.alert("Please enter a household name");

        // Disable the save button until finished
        setIsLoading(true)

        // Save the household object to the database
        saveHousehold({
            id: household.id,
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

                {/* Save Button */}
                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                    event.preventDefault();
                    handleSave();
                    }}
                >
                    Add household
                </button>
            </form>
        </>
        );
}

export default HouseholdForm