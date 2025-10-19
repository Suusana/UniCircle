import { useState } from "react";
import styled from "styled-components";
import { http } from "../utils/http";
import { useAuth } from "../contexts/AuthContext";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: grid;
  place-items: center;
  z-index: 50;
`;

const Modal = styled.div`
  width: min(640px, calc(100vw - 32px));
  background: #fff;
  border-radius: 20px;
  border: 1px solid #efefef;
  padding: 20px;
  box-shadow: 0 12px 36px rgba(16, 24, 40, 0.18);
`;

const ModalHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0b0f17;
`;

const Close = styled.button`
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  color: #667085;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-height: 100px;
  resize: vertical;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  padding: 10px 12px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.5;
  background: #fafafa;
  outline: none;
  overflow: auto;

  &:focus {
    background: #fff;
    box-shadow: 0 0 0 3px rgba(28, 100, 242, 0.12);
    border-color: #1c64f2;
  }
`;

const Button = styled.button`
  height: 40px;
  border-radius: 12px;
  padding: 0 14px;
  border: 1px solid transparent;
  background: #0b0f17;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    background: #1a1f2c;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  color: #16a34a;
  font-size: 13px;
  margin-top: 10px;
`;

export default function ReviewModal({ target, onClose }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit = text.trim().length >= 8 && stars > 0;

  const submit = async () => {
    if (!user || !("studentId" in user)) {
      alert("Please login first.");
      return;
    }
    try {
      setLoading(true);
      const body = new URLSearchParams();
      body.set("studentId", String(user.studentId));
      body.set("targetType", target.type === "lecturer" ? "Lecturer" : "Subject");
      if (target.type === "lecturer") body.set("lecturerId", target.id);
      else body.set("subjectId", target.id);
      body.set("rate", String(stars));
      body.set("description", text);

      await http.post(`/reviews/add`, body);

      // trigger reload in parent
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("review-posted"));
      }

      // show success
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose(); // close after a while
      }, 1200);
    } catch (e) {
      alert(e.message || "Post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <ModalHead>
          <Title>Review — {target?.name || target?.title}</Title>
          <Close onClick={onClose}>×</Close>
        </ModalHead>

        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setStars(n)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                style={{
                  color: n <= stars ? "#f59e0b" : "#e2e8f0",
                  fontSize: 24,
                }}
              >
                ★
              </span>
            </button>
          ))}
        </div>

        <TextArea
          placeholder="Share your experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <small style={{ color: "#667085" }}>Min 8 characters.</small>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 14,
          }}
        >
          <Button
            style={{
              background: "#fff",
              color: "#0b0f17",
              border: "1px solid #e6e6e6",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={!canSubmit || loading} onClick={submit}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </div>

        {success && <Message>Review posted!</Message>}
      </Modal>
    </Overlay>
  );
}
