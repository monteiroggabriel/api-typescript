import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Medicos from "./pages/medicos/Medicos.tsx";
import MedicoForm from "./pages/medicos/MedicoForm.tsx";
import Pacientes from "./pages/pacientes/Pacientes.tsx";
import PacienteForm from "./pages/pacientes/PacienteForm.tsx";
import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/medicos/novo" element={<MedicoForm />} />
          <Route path="/medicos/editar/:id" element={<MedicoForm />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/pacientes/novo" element={<PacienteForm />} />
          <Route path="/pacientes/editar/:id" element={<PacienteForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
