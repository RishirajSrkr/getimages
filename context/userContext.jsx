//why do we need userContext?
//we will not show certain things when a user is not logged in, for example in the header, we won't show 'create post' if a user is not logged in.
//userContext helps in tracking whether a user is logged in or not.

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
}

export default UserProvider;