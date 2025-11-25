import type { Paciente } from "../../types/Paciente.ts";
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

interface TabelaPacientesProps {
  pacientes: Paciente[];
  onDelete: (id: string) => void;
}

const TabelaPacientes = ({ pacientes, onDelete }: TabelaPacientesProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pacientes.map((paciente) => (
            <TableRow key={paciente.id}>
              <TableCell>{paciente.nome}</TableCell>
              <TableCell>{paciente.email}</TableCell>
              <TableCell>{paciente.cpf}</TableCell>
              <TableCell>
                <Box>
                  <Button
                    variant="contained"
                    color="warning"
                    component={Link}
                    to={`/pacientes/editar/${paciente.id}`}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(paciente.id)}
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

export default TabelaPacientes;
