import RegistrationForm from "../components/RegistrationForm";
import Countdown from "../components/Countdown";
import eventLogo from "../assets/images/gta-fortune-run.png";
import cseaLogo from "../assets/images/csea logo.png";

function Home() {
  return (
    <main className="home-page">
      <header className="top-bar">
        <span className="college-name">PSG COLLEGE OF TECHNOLOGY</span>

        <div className="header-brand">
          <img src={cseaLogo} alt="CSEA Logo" className="csea-logo" />
          <span className="portal-label">CSEA PRESENTS</span>
        </div>
      </header>

      <section className="hero">
        <img src={eventLogo} alt="GTA: Fortune Run" className="event-logo" />
        <p className="hero-tagline">THINK FAST. PLAY SMART. CASH IN.</p>
      </section>

      <Countdown />
      <RegistrationForm />

      <footer className="bottom-bar">
        <span>LOS SANTOS AWAITS.</span>
        <span>YOUR STORY STARTS HERE.</span>
      </footer>
    </main>
  );
}

export default Home;