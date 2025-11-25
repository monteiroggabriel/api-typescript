import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Medico } from "../../types/Medico.ts";
import { api } from "../../services/api";
import { Container, Typography, Button, Box } from "@mui/material";
import TabelaMedicos from "../../components/medicos/TabelaMedicos.tsx";

const Medicos = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);

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

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Médicos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/medicos/novo"
        >
          Novo Médico
        </Button>
      </Box>
      <TabelaMedicos medicos={medicos} onDelete={handleDelete} />
    </Container>
  );
};

export default Medicos;
