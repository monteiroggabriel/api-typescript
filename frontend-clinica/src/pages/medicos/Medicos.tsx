import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Medico } from "../../types/Medico";
import { api } from "../../services/api";
import { Container, Typography, Button, Box, TextField } from "@mui/material";
import TabelaMedicos from "../../components/medicos/TabelaMedicos.tsx";

const Medicos = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await api.get("/medicos");
        setMedicos(response.data);
      } catch (error) {
        console.error("Erro ao buscar médicos:", error);
      }
    };

    fetchMedicos();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este médico?")) {
      try {
        await api.delete(`/medicos/${id}`);
        setMedicos(medicos.filter((medico) => medico.id !== id));
      } catch (error) {
        console.error("Erro ao excluir médico:", error);
      }
    }
  };

  const filteredMedicos = useMemo(() => {
    return medicos.filter(
      (medico) =>
        medico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [medicos, searchTerm]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Médicos
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/medicos/novo"
          >
            Novo Médico
          </Button>
          <TextField
            label="Buscar por nome ou especialidade"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "40%" }}
          />
        </Box>
      </Box>
      <TabelaMedicos medicos={filteredMedicos} onDelete={handleDelete} />
    </Container>
  );
};

export default Medicos;
