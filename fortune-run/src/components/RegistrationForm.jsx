
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CrewCard from "./CrewCard";

import b1 from "../assets/images/avatars/b1.webp";
import b2 from "../assets/images/avatars/b2.webp";
import b3 from "../assets/images/avatars/b3.webp";
import g1 from "../assets/images/avatars/g1.webp";
import g2 from "../assets/images/avatars/g2.webp";
import g3 from "../assets/images/avatars/g3.webp";

import confirmButton from "../assets/images/confirm-your-crew.png";

const avatarPool = {
  male: [b1, b2, b3],
  female: [g1, g2, g3],
};

function getRandomAvatar(style, used = []) {
  const available = avatarPool[style].filter(
    (avatar) => !used.includes(avatar)
  );

  return available.length
    ? available[Math.floor(Math.random() * available.length)]
    : null;
}

function createMember(style, used = []) {
  return {
    style,
    avatar: getRandomAvatar(style, used),
    name: "",
    rollNo: "",
    phone: "",
  };
}

function RegistrationForm() {
  const navigate = useNavigate();

  const [members, setMembers] = useState(() => {
    const first = createMember("male");
    const second = createMember("female", [first.avatar]);
    const third = createMember("male", [
      first.avatar,
      second.avatar,
    ]);

    return [first, second, third];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMemberChange = (index, updatedMember) => {
    setMembers((current) => {
      const previousMember = current[index];

      if (updatedMember.style !== previousMember.style) {
        const usedByOthers = current
          .filter((_, i) => i !== index)
          .map((member) => member.avatar);

        updatedMember = {
          ...updatedMember,
          avatar: getRandomAvatar(
            updatedMember.style,
            usedByOthers
          ),
        };
      }

      return current.map((member, i) =>
        i === index ? updatedMember : member
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (members.length !== 3) {
      setError("Exactly 3 crew members are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        members: members.map(({ name, rollNo, phone }) => ({
          name: name.trim(),
          rollNo: rollNo.trim(),
          phone: phone.trim(),
        })),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || import.meta.env.BASE_URL.replace(/\/$/, "")}/api/registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      const navigateToConfirmation = () => {
        navigate("/confirmation", {
          state: {
            members,
            registrationId: data.registrationId,
          },
        });
      };

      if (document.startViewTransition) {
        document.startViewTransition(navigateToConfirmation);
      } else {
        navigateToConfirmation();
      }
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="crew-grid three-members">
        {members.map((member, index) => (
          <CrewCard
            key={index}
            member={member}
            playerNumber={index + 1}
            onChange={(updated) =>
              handleMemberChange(index, updated)
            }
          />
        ))}
      </div>

      {error && (
        <p className="registration-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="image-action-button"
        disabled={loading}
        >
        <img
            src={confirmButton}
            alt={loading ? "Registering..." : "Confirm Your Crew"}
        />
        </button>

        {loading && (
        <p className="registration-wait-message" role="status" aria-live="polite">
            PLEASE WAIT UNTIL WE CONFIRM YOUR REGISTRATION
        </p>
        )}

    </form>
  );
}

export default RegistrationForm;
