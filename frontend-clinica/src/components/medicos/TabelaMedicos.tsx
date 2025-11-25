import type { Medico } from "../../types/Medico.ts";
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
import { Link } from "react-router-dom";

interface TabelaMedicosProps {
  medicos: Medico[];
  onDelete: (id: string) => void;
}

const TabelaMedicos = ({ medicos, onDelete }: TabelaMedicosProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>CRM</TableCell>
            <TableCell>Especialidade</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicos.map((medico) => (
            <TableRow key={medico.id}>
              <TableCell>{medico.nome}</TableCell>
              <TableCell>{medico.email}</TableCell>
              <TableCell>{medico.crm}</TableCell>
              <TableCell>{medico.especialidade}</TableCell>
              <TableCell>
                <Box>
                  <Button
                    variant="contained"
                    color="warning"
                    component={Link}
                    to={`/medicos/editar/${medico.id}`}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(medico.id)}
                  >
                    Excluir
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

export default TabelaMedicos;
