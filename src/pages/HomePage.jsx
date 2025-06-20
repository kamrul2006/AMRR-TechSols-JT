import { Children } from "react";
import Navbar from "../components/Fixed/Navbar";
import HomeBanner from "../components/home/homeBanner";
import Footer from "../components/Fixed/Footer";

const HomePage = () => {
    return (
        <div>
            <Navbar />

            <HomeBanner />

            <Footer />

        </div>
    );
};

export default HomePage;
