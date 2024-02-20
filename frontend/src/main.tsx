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
import SignUpForm from "./forms/SignUpForm.tsx";
import LogInForm from "./forms/LogInForm.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/log-in" element={<LogInForm />} />
            {/* Private Routes */}
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer />
        </QueryClientProvider>
    </React.StrictMode>
);
