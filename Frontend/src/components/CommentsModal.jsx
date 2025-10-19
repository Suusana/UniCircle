import { useEffect, useState } from "react";
import styled from "styled-components";
import { http } from "../utils/http";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.25);
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
  box-shadow: 0 12px 36px rgba(16,24,40,.18);
`;

export default function CommentsModal({ target, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const url = target.type === "lecturer"
          ? `/reviews/lecturer/${target.id}`
          : `/reviews/subject/${target.id}`;
        const data = (await http.get(url)).data;
        setReviews(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [target]);

  return (
    <Overlay>
      <Modal>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <h3>Comments — {target?.name || target?.title}</h3>
          <button onClick={onClose} style={{ border: "none", background: "transparent", fontSize: 20, cursor: "pointer" }}>×</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : reviews.length === 0 ? (
          <p style={{ color: "#667085" }}>No comments yet.</p>
        ) : (
          <div style={{ maxHeight: "60vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ border: "1px solid #efefef", borderRadius: 12, padding: 10 }}>
                <strong>{r.student?.firstName || `Student #${r.studentId}`}</strong>
                <div style={{ color: "#f59e0b" }}>{"★".repeat(r.rate || 0)}</div>
                <p style={{ marginTop: 4 }}>{r.description || <i style={{ color: "#98a2b3" }}>No details</i>}</p>
                <small style={{ color: "#667085" }}>{r.createTime}</small>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </Overlay>
  );
}
