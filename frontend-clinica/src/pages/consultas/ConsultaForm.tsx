import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { api } from "../../services/api";
import { consultaSchema } from "../../schemas/consultaSchema";
import type { Medico } from "../../types/Medico";
import type { Paciente } from "../../types/Paciente";

type FormData = z.infer<typeof consultaSchema>;

const ConsultaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(consultaSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicosRes, pacientesRes] = await Promise.all([
          api.get("/medicos"),
          api.get("/pacientes"),
        ]);
        setMedicos(medicosRes.data);
        setPacientes(pacientesRes.data);
      } catch (error) {
        console.error("Erro ao buscar médicos ou pacientes:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchConsulta = async () => {
        try {
          const response = await api.get(`/consultas/${id}`);
          const consulta = response.data;
          // Formatar data para o input datetime-local (YYYY-MM-DDTHH:mm)
          const dataFormatada = new Date(consulta.data)
            .toISOString()
            .slice(0, 16);
          setValue("pacienteId", consulta.pacienteId);
          setValue("medicoId", consulta.medicoId);
          setValue("data", dataFormatada);
        } catch (error) {
          console.error("Erro ao buscar dados da consulta:", error);
        }
      };
      fetchConsulta();
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const dataToSend = {
        ...data,
        data: new Date(data.data).toISOString(),
      };

      if (isEditMode) {
        await api.put(`/consultas/${id}`, dataToSend);
      } else {
        await api.post("/consultas", dataToSend);
      }
      navigate("/consultas");
    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
      alert("Não foi possível salvar a consulta. Verifique os dados.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Editar Consulta" : "Agendar Nova Consulta"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="pacienteId" className="block mb-1">
            Paciente
          </label>
          <select
            id="pacienteId"
            {...register("pacienteId")}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione um paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome}
              </option>
            ))}
          </select>
          {errors.pacienteId && (
            <p className="text-red-500 text-sm">{errors.pacienteId.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="medicoId" className="block mb-1">
            Médico
          </label>
          <select
            id="medicoId"
            {...register("medicoId")}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione um médico</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nome} ({medico.especialidade})
              </option>
            ))}
          </select>
          {errors.medicoId && (
            <p className="text-red-500 text-sm">{errors.medicoId.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="data" className="block mb-1">
            Data e Hora
          </label>
          <input
            type="datetime-local"
            id="data"
            {...register("data")}
            className="w-full p-2 border rounded"
          />
          {errors.data && (
            <p className="text-red-500 text-sm">{errors.data.message}</p>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditMode ? "Salvar Alterações" : "Agendar"}
        </button>
      </form>
    </div>
  );
};

export default ConsultaForm;
