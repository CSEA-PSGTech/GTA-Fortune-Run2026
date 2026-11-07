import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.members || !state?.registrationId) {
    return (
      <main className="confirmation-page">
        <div className="no-mission">
          <h1>NO ACTIVE MISSION</h1>
          <button onClick={() => navigate("/")}>
            BACK TO REGISTRATION
          </button>
        </div>
      </main>
    );
  }

  const { members, registrationId } = state;

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
          <h2>{registrationId}</h2>
        </div>

        <div className="confirmed-crew">
          <h3>YOUR CREW</h3>

          {members.map((member, index) => (
            <div className="confirmed-member" key={index}>
              {member.avatar && (
                <img src={member.avatar} alt="" />
              )}

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
            <p>
              Join the participants' WhatsApp group for event updates.
            </p>
          </div>

          <p className="invite-pending">
            INVITATION LINK WILL BE ADDED SOON
          </p>
        </div>

        <p className="confirmation-footer">
          LOS SANTOS AWAITS. YOUR STORY STARTS HERE.
        </p>
      </section>
    </main>
  );
}

export default Confirmation;