import { useEffect, useState } from "react";
import styled from "styled-components";
import { http } from "../utils/http";
import { useAuth } from "../contexts/AuthContext";

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
  const { user } = useAuth(); // get logged in user info
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // load reviews for the target (lecturer or subject)
  const loadReviews = async () => {
    setLoading(true);
    try {
      const url =
        target.type === "lecturer"
          ? `/reviews/lecturer/${target.id}`
          : `/reviews/subject/${target.id}`;
      const data = (await http.get(url)).data;
      setReviews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [target]);

  // delete review
  const handleDelete = async (r) => {
    try {
      await http.delete(`/reviews/${r.reviewId}?studentId=${user.studentId}`);
      setReviews((prev) => prev.filter((x) => x.reviewId !== r.reviewId));
      window.dispatchEvent(new Event("review-posted"));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };
  

  return (
    <Overlay>
      <Modal>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Comments — {target?.name || target?.title}</h3>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
              color: "#667085",
            }}
          >
            ×
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : reviews.length === 0 ? (
          <p style={{ color: "#667085" }}>No comments yet.</p>
        ) : (
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #efefef",
                  borderRadius: 12,
                  padding: 10,
                  background: "#fafafa",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>
                    {r.student?.firstName || `Student #${r.studentId}`}
                  </strong>

                  {/* only show delete button when the logged in user is the view writter */}
                  {user?.studentId === r.studentId && (
                    <button
                      onClick={() => handleDelete(r)}
                      style={{
                        background: "none",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        padding: "2px 6px",
                        cursor: "pointer",
                        color: "#b91c1c",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>

                <div style={{ color: "#f59e0b", marginTop: 4 }}>
                  {"★".repeat(r.rate || 0)}
                </div>

                <p
                  style={{
                    marginTop: 6,
                    marginBottom: 6,
                    color: "#111827",
                    fontSize: 14,
                  }}
                >
                  {r.description || (
                    <i style={{ color: "#98a2b3" }}>No details</i>
                  )}
                </p>

                <small style={{ color: "#667085" }}>{r.createTime}</small>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </Overlay>
  );
}
