
import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import eventLogo from "../assets/images/gta-fortune-run.png";

function Registration() {
  return (
    <main className="home-page registration-page">
      <header className="top-bar">
        <Link to="/" className="back-link">
          ← BACK TO HOME
        </Link>

        <span className="college-name">
          PSG COLLEGE OF TECHNOLOGY
        </span>
      </header>

      <section className="registration-heading">
        <img
          src={eventLogo}
          alt="GTA: Fortune Run"
          className="registration-logo"
        />

        <h1>BUILD YOUR CREW</h1>
        <p>ENTER DETAILS FOR ALL THREE PLAYERS</p>
      </section>

      <RegistrationForm />

      <footer className="bottom-bar">
        <span>LOS SANTOS AWAITS.</span>
        <span>YOUR STORY STARTS HERE.</span>
      </footer>
    </main>
  );
}

export default Registration;
