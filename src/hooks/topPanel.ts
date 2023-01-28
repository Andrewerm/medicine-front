import React, {Dispatch, ReactNode, SetStateAction} from "react";
export type ITopPanelContext = {
    buttons: Array<ReactNode>
    setButtons:Dispatch<SetStateAction<any>>
}
export const TopPanelContext = React.createContext<ITopPanelContext|undefined>(undefined);
