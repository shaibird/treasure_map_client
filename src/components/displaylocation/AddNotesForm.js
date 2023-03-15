import { useState, useEffect } from "react";
import { createLocation } from "../../managers/LocationManager";
import { Toggle } from "../savelocation/ToggleButton";
import './AddNotesForm.css'

export const AddNotesForm = ({ location, setAddNote }) => {
    

    const localUser = localStorage.getItem("tm_token");
    const userObject = JSON.parse(localUser);

    console.log(userObject.id);

    const saveNewNote = (event) => {
        event.preventDefault();

        const noteToSendToAPI = {
            ...note,
            date: new Date(),
        };

        createLocation(noteToSendToAPI)
            .then((savedNote) => {
                console.log("Note saved:", savedNote);
                // Do something with the savedLocation, e.g. update state or redirect to another page
            })
            .catch((error) => {
                console.error("Failed to save note:", error);
                // Do something with the error, e.g. show an error message
            });
    };

    const [note, setNote] = useState({
        note: "",
        location: location.id,
        user: userObject.id,
        private: false,
        date: new Date(),
    });

    const handleNoteChange = (event) => {
        const note = event.target.value;
        setNote((prevState) => ({
            ...prevState,
            note: note,
        }));
    };

    const handleToggle = (isToggled) => {
        setNote({ ...note, private: isToggled })
    };

    const handleCloseClick = () => {
        setAddNote(false);
    }


    return (
        <div className="sidebar">
            <form className="save-note">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Note:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Location Note"
                            value={note.note}
                            onChange={(event) => setNote(prevNote => ({ ...prevNote, note: event.target.value }))}
                        />
                    </div>
                    <Toggle label="Private" toggled={note.private} onToggle={handleToggle} />
                </fieldset>
                <button type="submit" onClick={saveNewNote}>Save Note</button>
                <button type="close" onClick={handleCloseClick}>Close</button>
            </form>
        </div>
    );
};