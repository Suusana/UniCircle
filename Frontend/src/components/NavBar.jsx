import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const TabsStyle = styled((props) => <Tabs {...props} />)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiTabs-indicator": { backgroundColor: "black" }, //changes underline bar color
}));

// Custom Tab with no ripple effect and specific styles
const TabStyle = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    "&.Mui-selected": {
      // This changes tab name text color when it's selected
      color: "black",
    },
  })
);
//https://mui.com/material-ui/react-tabs/ -> MUI Tabs documentation
function NavBar() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <TabsStyle value={value} onChange={handleChange} centered>
        <TabStyle label="Home" component={Link} to="/" />
        <TabStyle label="Profile" component={Link} to="/profile" />
        <TabStyle label="Friends" component={Link} to="/friends" />
        <TabStyle label="Clubs" component={Link} to="/clubs" />
        <TabStyle label="Discussion" component={Link} to="/discussion" />
        <TabStyle label="Appointment" component={Link} to="/Appointment" />
      </TabsStyle>
    </Box>
  );
}
export default NavBar;
