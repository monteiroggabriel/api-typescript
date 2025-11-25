import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">
            Clínica
          </Button>
          <Box>
            <Button color="inherit" component={Link} to="/medicos">
              Médicos
            </Button>
            <Button color="inherit" component={Link} to="/pacientes">
              Pacientes
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
