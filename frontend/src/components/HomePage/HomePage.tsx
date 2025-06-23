import "./HomePage.css";
import { useEffect, useState } from "react";

function HomePage() {
    const imageUrls = [
        "https://tb-static.uber.com/prod/image-proc/processed_images/d32545b6a3aa33d632786b6faaa2b2e6/fb86662148be855d931b37d6c1e5fcbe.jpeg",
        "https://elancianoreydelosvinos.es/wp-content/uploads/2020/09/presupuesto-para-abrir-una-cafeteria.jpg",
        "https://laverdaddemonagas.com/wp-content/uploads/2023/10/1oct-dia-internacional-del-cafe-el-nectar-de-los-dioses-laverdaddemonagas.com-historia-del-cafe-01-1194x800-1.jpg"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [imageUrls.length]);

    return (
        <div className="main-page">
            <div className="announcement-sec">
                {/* <div className="announcement-text">
                    <h1>Coming Soon...</h1>
                </div> */}
                <div className="banner-carousel">
                    <img
                        src={imageUrls[currentImageIndex]}
                        alt="Coffee shop banner"
                        className="banner-image"
                    />
                </div>
            </div>
            <div className="about-sec">
                <div className="our-story-sec">
                    <h1>Our Story...</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="our-story-sec">
                    <h3>M-F: 7:30 am - 4 pm PT; Weekends: 8 am - 2 pm PT</h3>
                </div>
                </div>

                <div className="social-media-sec">
                    <h1>Check out our social media!</h1>
                    <div className="social-tile">
                        <div className="social-header">
                            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" />
                            <span>@diadelcafe</span>
                        </div>

                        <div className="social-preview-grid">

                            <img src="/diadelcafe_insta/insta1.png" />
                            <img src="/diadelcafe_insta/insta2.png" />
                            <img src="/diadelcafe_insta/insta3.png" />

                        </div>
                        <a
                            className="social-link"
                            href="https://www.instagram.com/diadelcafe/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on Instagram!
                        </a>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default HomePage;
