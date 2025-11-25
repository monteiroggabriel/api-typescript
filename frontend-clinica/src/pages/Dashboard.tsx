import { useEffect, useState } from "react";
import { api } from "../services/api";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const Dashboard = () => {
  const [medicosCount, setMedicosCount] = useState(0);
  const [pacientesCount, setPacientesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicosResponse = await api.get("/medicos");
        setMedicosCount(medicosResponse.data.length);
        const pacientesResponse = await api.get("/pacientes");
        setPacientesCount(pacientesResponse.data.length);
      } catch (error) {
        console.error("Erro ao buscar dados para o dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 4, textAlign: 'center' }}>
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                Médicos Cadastrados
              </Typography>
              <Typography variant="h2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {medicosCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                Pacientes Cadastrados
              </Typography>
              <Typography variant="h2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {pacientesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
