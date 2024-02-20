import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <section className="flex flex-col min-h-screen">
            <section className="flex-none">
                <Header />
                
            </section>
            <main className="flex-1 container mx-auto px-4">
                <Outlet />
            </main>
            <section className="flex-none">
                <Footer />
            </section>
        </section>
    );
};
export default MainLayout;
