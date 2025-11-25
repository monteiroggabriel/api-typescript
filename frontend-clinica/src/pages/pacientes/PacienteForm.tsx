import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PacienteFormData,
  pacienteSchema,
} from "../../schemas/pacienteSchema";
import { api } from "../../services/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ZodError } from "zod";

const PacienteForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PacienteFormData>({
    nome: "",
    email: "",
    cpf: "",
  });
  const [errors, setErrors] = useState<Partial<PacienteFormData>>({});

  useEffect(() => {
    if (id) {
      const fetchPaciente = async () => {
        try {
          const response = await api.get(`/pacientes/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Erro ao buscar paciente:", error);
        }
      };
      fetchPaciente();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      pacienteSchema.parse(formData);
      if (id) {
        await api.put(`/pacientes/${id}`, formData);
      } else {
        await api.post("/pacientes", formData);
      }
      navigate("/pacientes");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<PacienteFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof PacienteFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Erro ao salvar paciente:", error);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? "Editar Paciente" : "Novo Paciente"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="nome"
            label="Nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.nome}
            helperText={errors.nome}
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            name="cpf"
            label="CPF"
            value={formData.cpf}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.cpf}
            helperText={errors.cpf}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default PacienteForm;
