import React, {useState} from "react";

export const SpinnerContext = React.createContext(false)


export function useSpinner() {
    const [spinnerState, setSpinnerState] = useState(false)

    return {spinnerState, setSpinnerState}
}
