import {Navigation} from "./Navigation";
import {Outlet} from "react-router-dom";
import {Footer} from "./Footer";

export function Layout() {
    return (
        <>

            <Navigation/>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>

        </>
    )
}
