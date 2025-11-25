import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Clínica
          </Button>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/medicos">
            Médicos
          </Button>
          <Button color="inherit" component={Link} to="/pacientes">
            Pacientes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
