import React, {useState} from "react";
import {IUserProfile} from "../types";

interface IProfileDataProps {
    children: React.ReactNode
}

interface IProfileDataContext {
    dataUser: IUserProfile,
    setDataUser: any
}

const initialUserProfileDataContext:IProfileDataContext={
    dataUser: { FIO: null},
    setDataUser: undefined
}

export const ProfileDataContext=React.createContext<IProfileDataContext>(initialUserProfileDataContext)

export const ProfileData:React.FC<IProfileDataProps>=({children})=>{
    const [dataUser, setDataUser] = useState<IUserProfile>(initialUserProfileDataContext.dataUser);
    return (
        <ProfileDataContext.Provider value={{dataUser, setDataUser}}>
            {children}
        </ProfileDataContext.Provider>
    )
}
