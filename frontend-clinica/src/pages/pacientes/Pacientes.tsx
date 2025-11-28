import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Paciente } from "../../types/Paciente";
import { api } from "../../services/api";
import { Container, Typography, Button, Box, TextField } from "@mui/material";
import TabelaPacientes from "../../components/pacientes/TabelaPacientes.tsx";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredPacientes = useMemo(() => {
    return pacientes.filter(
      (paciente) =>
        paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.cpf.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pacientes, searchTerm]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Pacientes
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/pacientes/novo"
          >
            Novo Paciente
          </Button>
          <TextField
            label="Buscar por nome ou CPF"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "40%" }}
          />
        </Box>
      </Box>
      <TabelaPacientes pacientes={filteredPacientes} onDelete={handleDelete} />
    </Container>
  );
};

export default Pacientes;
