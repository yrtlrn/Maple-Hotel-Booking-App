import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    RouterProvider,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./layouts/AuthLayout.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";

import LogInPage from "./pages/LogInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import AddHotelPage from "./pages/AddHotelPage.tsx";
import EditProfilePage from "./pages/EditProfilePage.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            {/* Public Routes */}
            <Route index element={<App />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/log-in" element={<LogInPage />} />
            {/* Private Routes */}
            <Route path="" element={<AuthLayout />}>
                <Route path="/add-hotel" element={<AddHotelPage />} />
                <Route path="/edit-profile" element={<EditProfilePage />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <RouterProvider router={router} />
                <ToastContainer />
            </AppContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
