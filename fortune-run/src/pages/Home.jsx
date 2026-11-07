
import { Link } from "react-router-dom";
import Countdown from "../components/Countdown";
import eventLogo from "../assets/images/gta-fortune-run.png";
import cseaLogo from "../assets/images/csea logo.png";

import { useEffect } from "react";

import b1 from "../assets/images/avatars/b1.webp";
import b2 from "../assets/images/avatars/b2.webp";
import b3 from "../assets/images/avatars/b3.webp";
import g1 from "../assets/images/avatars/g1.webp";
import g2 from "../assets/images/avatars/g2.webp";
import g3 from "../assets/images/avatars/g3.webp";

import registerButton from "../assets/images/register-now.png";

function Home() {

    useEffect(() => {
        const avatars = [b1, b2, b3, g1, g2, g3];

        avatars.forEach((src) => {
            const image = new Image();
            image.src = src;
        });
        }, []);

  return (
    <main className="home-page landing-page">
      <header className="top-bar">
        <span className="college-name">
          PSG COLLEGE OF TECHNOLOGY
        </span>

        <a
          href="https://csea.psgtech.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="header-brand"
          aria-label="Visit CSEA official website"
        >
          <img src={cseaLogo} alt="CSEA Logo" className="csea-logo" />
          <span className="portal-label">CSEA PRESENTS</span>
        </a>
      </header>

      <section className="hero">
        <img
          src={eventLogo}
          alt="GTA: Fortune Run"
          className="event-logo"
        />
        <p className="hero-tagline">
          THINK FAST. PLAY SMART. CASH IN.
        </p>
      </section>

      <section className="landing-countdown">
        <Countdown />
      </section>

      <Link to="/register" className="image-action-button">
        <img src={registerButton} alt="Register Now" />
        </Link>

      <section className="contact-section">
        <p className="contact-heading">FOR QUERIES & SUPPORT</p>

        <div className="contact-details">
          <a href="tel:+918778525284">
            Sanjana <span>+91 877 852 5284</span>
          </a>

          <a href="tel:+919080857517">
            Sri Deaksha <span>+91 90808 57517</span>
          </a>
        </div>
      </section>

      <footer className="bottom-bar">
        <span>LOS SANTOS AWAITS.</span>
        <span>YOUR STORY STARTS HERE.</span>
      </footer>
    </main>
  );
}

export default Home;
