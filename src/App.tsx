import {Routes, Route} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {} from "antd";
import {NotFoundPage} from "./pages/NotFoundPage";
import {Layout} from "./components/Layout";
import {HomePage} from "./pages/HomePage";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>

            </Routes>
        </>
    )
}
