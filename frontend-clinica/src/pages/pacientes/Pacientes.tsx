import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Paciente } from "../../types/Paciente.ts";
import { api } from "../../services/api";
import { Container, Typography, Button, Box } from "@mui/material";
import TabelaPacientes from "../../components/pacientes/TabelaPacientes.tsx";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get("/pacientes");
        setPacientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este paciente?")) {
      try {
        await api.delete(`/pacientes/${id}`);
        setPacientes(pacientes.filter((paciente) => paciente.id !== id));
      } catch (error) {
        console.error("Erro ao excluir paciente:", error);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Pacientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/pacientes/novo"
        >
          Novo Paciente
        </Button>
      </Box>
      <TabelaPacientes pacientes={pacientes} onDelete={handleDelete} />
    </Container>
  );
};

export default Pacientes;
