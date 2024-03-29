import { useState, useEffect } from "react";
import { saveNote } from "../../managers/LocationManager";
import { Toggle } from "../savelocation/ToggleButton";
import './AddNotesForm.css'

export const AddNotesForm = ({ location, setAddNote, fetchLocationNotes }) => {
    const localUser = localStorage.getItem("tm_token");
    const userObject = JSON.parse(localUser);

    const handleCloseClick = () => {
        setAddNote(false);
    }

    const saveNewNote = (event) => {
        event.preventDefault();

        const noteToSendToAPI = {
            ...note,
            date: new Date(),
        };

        saveNote(noteToSendToAPI)
            .then((savedNote) => {
                console.log("Note saved:", savedNote);
                // Do something with the savedLocation, e.g. update state or redirect to another page
            })
            .catch((error) => {
                console.error("Failed to save note:", error);
                // Do something with the error, e.g. show an error message
            })
            .then(() => {
                handleCloseClick()
            }).then(() => {
                fetchLocationNotes()
            })
    };

    const [note, setNote] = useState({
        note: "",
        location: location.id,
        user: userObject.id,
        private: false,
        date: new Date(),
    });

    const handleToggle = (isToggled) => {
        setNote({ ...note, private: isToggled })
    };



    const handleSubmit = (event) => {
        saveNewNote(event);
    }

    return (
        <div className="Notes">
            <form className="save-note-s" onSubmit={handleSubmit}>
                <fieldset className="notes">
                    <div className="notes-form">
                        <label htmlFor="name">Note:</label>
                        <textarea
                            rows="5" cols="25"
                            required autoFocus
                            type="text"
                            className="notes-form-control"
                            value={note.note}
                            onChange={(event) => setNote(prevNote => ({ ...prevNote, note: event.target.value }))}
                        />
                    </div>
                    <Toggle label="Private" toggled={note.private} onToggle={handleToggle} />
                </fieldset>
                <button type="button" onClick={saveNewNote}>Save Note</button>
                <button type="button" onClick={handleCloseClick}>Close</button>
            </form>
        </div>
    );
};
