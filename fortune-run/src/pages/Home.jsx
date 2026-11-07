
import RegistrationForm from "../components/RegistrationForm";
import Countdown from "../components/Countdown";
import eventLogo from "../assets/images/gta-fortune-run.png";
import cseaLogo from "../assets/images/csea logo.png";

function Home() {
  return (
    <main className="home-page">
      <header className="top-bar">
        <span className="college-name">PSG COLLEGE OF TECHNOLOGY</span>

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
        <img src={eventLogo} alt="GTA: Fortune Run" className="event-logo" />
        <p className="hero-tagline">THINK FAST. PLAY SMART. CASH IN.</p>
      </section>

      <Countdown />
      <RegistrationForm />

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
