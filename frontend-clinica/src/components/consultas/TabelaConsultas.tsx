import { Link } from "react-router-dom";
import type { Consulta } from "../../types/Consulta";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";

interface TabelaConsultasProps {
  consultas: Consulta[];
  onDelete: (id: string) => void;
}

const TabelaConsultas = ({
  consultas,
  onDelete,
}: TabelaConsultasProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Médico</TableCell>
            <TableCell>Data e Hora</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultas.map((consulta) => (
            <TableRow key={consulta.id}>
              <TableCell>{consulta.paciente?.nome || "N/A"}</TableCell>
              <TableCell>{consulta.medico?.nome || "N/A"}</TableCell>
              <TableCell>
                {new Date(consulta.data).toLocaleString()}
              </TableCell>
              <TableCell>
                <Box>
                  <Button
                    variant="contained"
                    color="warning"
                    component={Link}
                    to={`/consultas/editar/${consulta.id}`}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(consulta.id)}
                  >
                    Cancelar
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaConsultas;
