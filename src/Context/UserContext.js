import axios from "axios";
import React, { createContext, useEffect, useState } from "react";



export const UserContext = createContext();


export const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState([]);

    // console.log(loggedUser);

    React.useEffect(() => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            // console.log(loggedInUser);
            setLoggedUser(JSON.parse(loggedInUser));
        }
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://dull-gold-marlin-tux.cyclic.app/api/v1/users");
                setUsers(res.data.users);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (
        <UserContext.Provider value={{ users, setUsers, loggedUser, setLoggedUser }}>
            {children}
        </UserContext.Provider>
    );
};

