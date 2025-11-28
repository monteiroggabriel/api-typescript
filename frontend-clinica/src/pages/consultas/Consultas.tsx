import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import type { Consulta } from "../../types/Consulta";
import TabelaConsultas from "../../components/consultas/TabelaConsultas";
import {
  TextField,
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";

const Consultas = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await api.get("/consultas");
        setConsultas(response.data);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    };
    fetchConsultas();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      try {
        await api.delete(`/consultas/${id}`);
        setConsultas(consultas.filter((consulta) => consulta.id !== id));
      } catch (error) {
        console.error("Erro ao deletar consulta:", error);
      }
    }
  };

  const filteredConsultas = useMemo(() => {
    return consultas.filter((consulta) => {
      const consultaDate = new Date(consulta.data);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && consultaDate < start) {
        return false;
      }
      if (end && consultaDate > end) {
        return false;
      }

      const searchTermLower = searchTerm.toLowerCase();
      const patientName = consulta.paciente?.nome.toLowerCase() || "";
      const doctorName = consulta.medico?.nome.toLowerCase() || "";

      return (
        patientName.includes(searchTermLower) ||
        doctorName.includes(searchTermLower)
      );
    });
  }, [consultas, searchTerm, startDate, endDate]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gerenciar Consultas
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/consultas/novo"
          >
            Agendar Consulta
          </Button>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="Buscar por paciente ou médico"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "300px" }}
            />
            <TextField
              type="date"
              label="Data Início"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="date"
              label="Data Fim"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
      </Box>

      <TabelaConsultas consultas={filteredConsultas} onDelete={handleDelete} />
    </Container>
  );
};

export default Consultas;
