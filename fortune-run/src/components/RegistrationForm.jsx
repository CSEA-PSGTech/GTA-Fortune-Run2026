
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CrewCard from "./CrewCard";

import b1 from "../assets/images/avatars/b1.png";
import b2 from "../assets/images/avatars/b2.png";
import b3 from "../assets/images/avatars/b3.png";
import g1 from "../assets/images/avatars/g1.png";
import g2 from "../assets/images/avatars/g2.png";
import g3 from "../assets/images/avatars/g3.png";

const API_URL = "http://localhost:5001/api/registrations";

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

  const [members, setMembers] = useState(() => [
    createMember("male"),
    createMember("female"),
  ]);

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
          avatar: getRandomAvatar(updatedMember.style, usedByOthers),
        };
      }

      return current.map((member, i) =>
        i === index ? updatedMember : member
      );
    });
  };

  const addMember = () => {
    setMembers((current) => {
      if (current.length >= 3) return current;

      const used = current.map((member) => member.avatar);
      const style = Math.random() < 0.5 ? "male" : "female";

      let avatar = getRandomAvatar(style, used);
      let selectedStyle = style;

      if (!avatar) {
        selectedStyle = style === "male" ? "female" : "male";
        avatar = getRandomAvatar(selectedStyle, used);
      }

      return [
        ...current,
        {
          style: selectedStyle,
          avatar,
          name: "",
          rollNo: "",
          phone: "",
        },
      ];
    });
  };

  const removeMember = (index) => {
    setMembers((current) => current.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // Send only the fields required by the backend.
      const payload = {
        members: members.map(({ name, rollNo, phone }) => ({
          name: name.trim(),
          rollNo: rollNo.trim(),
          phone: phone.trim(),
        })),
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
        err.message || "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div
        className={`crew-grid ${
          members.length === 3 ? "three-members" : ""
        }`}
      >
        {members.map((member, index) => (
          <CrewCard
            key={index}
            member={member}
            playerNumber={index + 1}
            onChange={(updated) => handleMemberChange(index, updated)}
            onRemove={() => removeMember(index)}
          />
        ))}
      </div>

      {members.length < 3 && (
        <button
          type="button"
          className="add-member-button"
          onClick={addMember}
          disabled={loading}
        >
          + ADD CREW MEMBER
        </button>
      )}

      {error && (
        <p className="registration-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="submit-button"
        disabled={loading}
      >
        {loading ? "REGISTERING..." : "CONFIRM YOUR CREW ↗"}
      </button>
    </form>
  );
}

export default RegistrationForm;
