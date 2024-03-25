import React from "react"; // Import React
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './index.css';

// PAGES
// ----- ERRORS
import Page400 from "./pages/error/page400";
import Page403 from "./pages/error/page403";
import Page404 from "./pages/error/page404";
import Page500 from "./pages/error/page500";
// ----- HOME
import Homepage from './pages/home/homepage';
// ----- Figma
import FigmaLayout from "./pages/home/figmaBoard";
import WorkspacePage from "./pages/home/figmaMainPage";
// ----- LOGIN
import FigmaAuth from "./pages/auth/figma";

// ----- WORKSPACE
import Workspace from "./pages/home/workspace";

// LAYOUTS
// ----- HOME
import HomeLayout from "./pages/home/layout";
// ----- ERRORS
import ErrorLayout from "./pages/error/layout";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/error" element={<ErrorLayout />}>
                    <Route index element={<Page404 />} />
                    <Route path="403" element={<Page403 />} />
                    <Route path="400" element={<Page400 />} />
                    <Route path="500" element={<Page500 />} />
                </Route>
                <Route path="/login" element={<FigmaAuth />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/*" element={<HomeLayout />}>
                    <Route index element={<Navigate to='/login'/>} />
                    <Route path="none"/>
                    <Route path="*" element={<Homepage />} />
                </Route>
                <Route path="/figma2" element={<FigmaLayout />}>
                    <Route path="*" element={<FigmaLayout />}/>
                </Route>
                <Route path="/figma1" element={<WorkspacePage />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
