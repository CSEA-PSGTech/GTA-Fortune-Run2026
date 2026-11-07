
function CrewCard({ member, onChange, playerNumber }) {
  const update = (field, value) => {
    onChange({ ...member, [field]: value });
  };

  return (
    <article className="crew-card">
      <div className="crew-card-image">
        {member.avatar ? (
          <>
            <img
              className="avatar-backdrop"
              src={member.avatar}
              alt=""
              aria-hidden="true"
            />

            <img
              className="avatar-main"
              src={member.avatar}
              alt="Crew character"
            />
          </>
        ) : (
          <div className="avatar-placeholder">
            SELECT CHARACTER
          </div>
        )}

        <span className="player-number">
          PLAYER 0{playerNumber}
        </span>

        {playerNumber === 1 && (
          <span className="leader-tag">CREW LEADER</span>
        )}
      </div>

      <div className="crew-card-content">
        <div className="crew-card-heading">
          <h3>
            {playerNumber === 1
              ? "THE LEADER"
              : `CREW MEMBER 0${playerNumber}`}
          </h3>
        </div>

        <select
          value={member.style}
          onChange={(e) => update("style", e.target.value)}
          required
          aria-label="Character style"
        >
          <option value="male">MALE</option>
          <option value="female">FEMALE</option>
        </select>

        <input
          type="text"
          placeholder="FULL NAME"
          value={member.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="COLLEGE ROLL NUMBER"
          value={member.rollNo}
          onChange={(e) => update("rollNo", e.target.value)}
          pattern="2[0-9][zZnN][0-9]{3}"
          maxLength={6}
          title="Format: 25z331 or 26n234"
          required
        />

        <input
          type="tel"
          placeholder="PHONE NUMBER"
          value={member.phone}
          onChange={(e) => update("phone", e.target.value)}
          pattern="[0-9]{10}"
          maxLength={10}
          inputMode="numeric"
          required
        />
      </div>
    </article>
  );
}

export default CrewCard;
