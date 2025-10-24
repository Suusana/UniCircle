//contributor: Zizhu Zhao
import { useEffect, useState } from "react";
import styled from "styled-components";
import { http } from "../utils/http";
import { useAuth } from "../contexts/AuthContext";
import ReviewModal from "./ReviewModal"; // import ReviewModal for editing

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

export default function CommentsModal({ target, onClose }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editReview, setEditReview] = useState(null); // State for review being edited

  // load reviews for the target
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

  // load reviews when target changes
  useEffect(() => {
    loadReviews();
  }, [target]);

  // refresh reviews when a review is posted/edited
  useEffect(() => {
    const handleRefresh = () => loadReviews();
    window.addEventListener("review-posted", handleRefresh);
    return () => window.removeEventListener("review-posted", handleRefresh);
  }, []);

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
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>
            Comments — {target?.name || target?.title}
          </h3>
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
            x
          </button>
        </div>

        {/* comment */}
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
            {reviews.map((r) => (
              <div
                key={r.reviewId}
                style={{
                  border: "1px solid #efefef",
                  borderRadius: 12,
                  padding: 10,
                  background: "#fafafa",
                }}
              >
                {/* top*/}
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

                  {/* button only writer can see */}
                  {user?.studentId === r.studentId && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => setEditReview(r)} // open edit modal
                        style={{
                          background: "none",
                          border: "1px solid #e5e7eb",
                          borderRadius: 8,
                          padding: "2px 6px",
                          cursor: "pointer",
                          color: "#2563eb",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        Edit
                      </button>
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
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* stars */}
                <div style={{ color: "#f59e0b", marginTop: 4 }}>
                  {"★".repeat(r.rate || 0)}
                </div>

                {/* description */}
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

                <small style={{ color: "#667085" }}>
                  {r.createTime}
                  {r.updateTime && r.updateTime !== r.createTime && " (edited)"}
                </small>
              </div>
            ))}
          </div>
        )}
      </Modal>

     {/* ReviewModal for editing review */}
      {editReview && (
        <ReviewModal
          target={target}
          review={editReview}
          onClose={() => setEditReview(null)}
        />
      )}

    </Overlay>
  );
}
