//contributor: Zizhu Zhao
import {Grid, Card, Avatar, Name, Meta, StarRating, Button, ButtonRow} from "../assets/styles/ReviewComponents";

export default function SubjectCards({ data = [], onView = () => {}, onWrite = () => {} }) {
  return (
    <Grid>
      {data.map((item) => {
        const avg = item.stats?.avg ?? 0;
        const count = item.stats?.count ?? 0;

        return (
          <Card key={item.id}>
            <Avatar>{item.title?.[0] || "S"}</Avatar>

            <div style={{ textAlign: "center" }}>
              <Name>{item.title || `Subject #${item.id}`}</Name>
              <Meta>{item.faculty || "—"}</Meta>
            </div>

            <div style={{ textAlign: "center" }}>
              <StarRating value={Math.round(avg)} />
              <Meta style={{ marginTop: "2px" }}>
                {avg.toFixed(1)} ({count})
              </Meta>
            </div>

            <ButtonRow>
              <Button onClick={() => onView(item)}>View</Button>
              <Button primary onClick={() => onWrite(item)}>
                Review
              </Button>
            </ButtonRow>
          </Card>
        );
      })}
    </Grid>
  );
}
