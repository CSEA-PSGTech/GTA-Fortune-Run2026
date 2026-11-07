
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001/api/registrations";

function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const registrationId = state?.registrationId;

  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!registrationId) {
      setLoading(false);
      setError("No registration ID found.");
      return;
    }

    const fetchRegistration = async () => {
      try {
        const response = await fetch(
          `${API_URL}/${encodeURIComponent(registrationId)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to retrieve registration."
          );
        }

        setRegistration(data);
      } catch (err) {
        setError(err.message || "Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, [registrationId]);

  if (loading) {
    return (
      <main className="confirmation-page">
        <div className="no-mission">
          <h1>LOADING MISSION...</h1>
        </div>
      </main>
    );
  }

  if (error || !registration) {
    return (
      <main className="confirmation-page">
        <div className="no-mission">
          <h1>NO ACTIVE MISSION</h1>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>
            BACK TO REGISTRATION
          </button>
        </div>
      </main>
    );
  }

  const { members, registrationId: savedId } = registration;

  return (
    <main className="confirmation-page">
      <header className="confirmation-header">
        <span>PSG COLLEGE OF TECHNOLOGY</span>
        <span>CSEA PRESENTS</span>
      </header>

      <section className="confirmation-content">
        <p className="confirmation-status">
          REGISTRATION SUCCESSFUL
        </p>

        <h1>MISSION PASSED</h1>

        <p className="confirmation-subtitle">
          YOUR CREW IS LOCKED IN.
        </p>

        <div className="registration-id">
          <p>REGISTRATION ID</p>
          <h2>{savedId}</h2>
        </div>

        <div className="confirmed-crew">
          <h3>YOUR CREW</h3>

          {members.map((member, index) => (
            <div className="confirmed-member" key={member.rollNo}>
              <div className="confirmed-member-details">
                <span>PLAYER 0{index + 1}</span>
                <h4>{member.name}</h4>
                <p>{member.rollNo}</p>
              </div>

              {index === 0 && (
                <span className="confirmed-leader">LEADER</span>
              )}
            </div>
          ))}
        </div>

        <div className="whatsapp-section">
        <div>
            <h3>STAY CONNECTED</h3>
            <p>Follow CSEA and join the participants' group for updates.</p>
        </div>

        <div className="social-links">
            <a
            href="https://www.instagram.com/cseapsgtech/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
            >
            FOLLOW CSEA ON INSTAGRAM 
            </a>

            <a
            href="https://chat.whatsapp.com/L0wRygfeNH96oWHr9lb0EW?s=cl&p=i&mlu=4&ilr=4&iam=2"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-invite-button"
            >
            JOIN PARTICIPANTS GROUP
            </a>
        </div>
        </div>

        <p className="confirmation-footer">
          LOS SANTOS AWAITS. YOUR STORY STARTS HERE.
        </p>
      </section>
    </main>
  );
}

export default Confirmation;
