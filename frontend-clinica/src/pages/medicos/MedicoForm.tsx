import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MedicoFormData, medicoSchema } from "../../schemas/medicoSchema";
import { api } from "../../services/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ZodError } from "zod";

const MedicoForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MedicoFormData>({
    nome: "",
    email: "",
    crm: "",
    especialidade: "",
  });
  const [errors, setErrors] = useState<Partial<MedicoFormData>>({});

  useEffect(() => {
    if (id) {
      const fetchMedico = async () => {
        try {
          const response = await api.get(`/medicos/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Erro ao buscar médico:", error);
        }
      };
      fetchMedico();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      medicoSchema.parse(formData);
      if (id) {
        await api.put(`/medicos/${id}`, formData);
      } else {
        await api.post("/medicos", formData);
      }
      navigate("/medicos");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<MedicoFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof MedicoFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Erro ao salvar médico:", error);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? "Editar Médico" : "Novo Médico"}
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
            name="crm"
            label="CRM"
            value={formData.crm}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.crm}
            helperText={errors.crm}
          />
          <TextField
            name="especialidade"
            label="Especialidade"
            value={formData.especialidade}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.especialidade}
            helperText={errors.especialidade}
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

export default MedicoForm;
