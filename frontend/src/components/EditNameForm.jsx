import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProfilUser,
    changeProfilUser,
    editNameToggle,
} from "../thunks/userThunks";

/**
 * Créer le formulaire d'edition du userName
 * @returns {ReactElement}
 * @param {String} token
 * @param {String} userName
 */

export default function EditNameForm({ token, userName }) {
    // redux states
    const firstName = useSelector((state) => state.user.firstName);
    const lastName = useSelector((state) => state.user.lastName);

    // state
    const [newUserName, setNewUserName] = useState(userName);

    // recupération des hooks
    const dispatch = useDispatch();

    // synchronise userName sur le 1e state de newUserName pour gérer le délai d'attente de redux
    useEffect(() => {
        setNewUserName(userName);
    }, [userName]);

    // envoi les données du formulaire pour changer userName et appel les nouvelles infos
    const handleClickSaveNewName = (e) => {
        e.preventDefault();
        dispatch(changeProfilUser({ token, newUserName }));
        dispatch(addProfilUser(token));
        dispatch(editNameToggle());
    };

    // cloture du formulaire
    const handleClickCloseEditName = () => {
        dispatch(editNameToggle());
        setNewUserName(userName);
    };

    return (
        <div className="header">
            <section className="edit-name-content">
                <h1 className="edit-name-title">Edit user info</h1>
                <form onSubmit={handleClickSaveNewName}>
                    <div className="input-edit-name-wrapper">
                        <label htmlFor="userName">User name</label>
                        <input
                            type="text"
                            id="userName"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="input-edit-name-wrapper">
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder={firstName}
                            readOnly
                        />
                    </div>
                    <div className="input-edit-name-wrapper">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder={lastName}
                            readOnly
                        />
                    </div>
                    <div className="input-button-wrapper">
                        <button className="sign-in-button" type="submit">
                            Save
                        </button>
                        <button
                            className="sign-in-button"
                            type="reset"
                            onClick={handleClickCloseEditName}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
