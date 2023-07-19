import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import React, { useState } from "react";

const errorsOrçamentoForm = {
  deveSerNumero: "Este campo deve ser um número!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaOrçamentoForm = yup.object({
  idPropriedade: yup.number().required("O ID da propriedade é obrigatório!"),
  Sacas_Safra: yup.number().required("O número de sacas é obrigatório!"),
  Umidade_Safra: yup.number().required("A umidade é obrigatória!"),
  Desconto_Impureza_Safra: yup.number().required("O desconto de impureza é obrigatório"),
  Sacas_Safrinha: yup.number().required("O número de sacas é obrigatório!"),
  Umidade_Safrinha: yup.number().required("A umidade é obrigatória!"),
  Desconto_Impureza_Safrinha: yup.number().required("O desconto de impureza é obrigatório!"),
  ValorSaca: yup.number().required("O valor da saca é obrigatório!"),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagem padrão
export type FormularioOrçamento = yup.InferType<typeof schemaOrçamentoForm>;

type PropriedadeOrçamentoProps = {
  enviaDadosFormulario: (dataFormulario: FormularioOrçamento) => any;
  carregando: boolean;
};

export default function OrçamentoFormulario({
  enviaDadosFormulario,
  carregando,
}: PropriedadeOrçamentoProps) {
  // O useForm é um hook da biblioteca react-hook-form. Esse hook retorna algumas propriedades.
  // FormState - Esse formState é onde acessamos o estado do formulário para checarmos se há erros, e pegar as mensagens de error.
  // HandleSubmit - É uma função que o hook form cria, essa função é chamada quando nosso formulário é submetido (pelo botao).
  // Register  - Essa função registra um campo html ao nosso campo do formulário criado no yup.
  // Control -  Esse control é uma forma de debugar o formulário, ele mostra todas as informações do formulário, em tempo real.
  const { formState, handleSubmit, control, register } =
    useForm<FormularioOrçamento>({
      resolver: yupResolver(schemaOrçamentoForm),
    });

  return (
    // Basicamente criamos um form puro do html, que tem a propriedade onSubmit, ess propriedade recebe uma função que é chamada quando enviamos o formulário
    // passamos então, a função handleSubmit(do useForm), a função handleSubmit recebe outra função, então agora passamos comoa argumento enviaDadosFormulario
    // perceba que passamos apenas a referencia da funcao, sem ().
    <form onSubmit={handleSubmit(enviaDadosFormulario)}>
      {/* Criamos um TextField(da bilbioteca material mui). Então usamos a sintaxe de desestruturação para registrar esse textfield como um campo do formulário
        chamando {...register("campoDoFormulario")}. TextField tem 2 propriedades que estão ligadas a mostrar erros pro usuário (error e helperText).
        Error recebe um booleano(true ou false), e serve para indicar quando tem um erro no input(ele fica vermelho), então chamamos formState(possui o estado do nosso formulário).
        HelperText recebe uma string que será exibida quando houver um erro(error === true). Veja que quem valida os erros é o useForm, a partir do schema do yup,
         e as mensagens são também controladas pelo yup quando criamos os schema.
        */}
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <TextField
            placeholder="ID da propriedade"
            required
            {...register("idPropriedade")}
            error={!!formState.errors.idPropriedade}
            helperText={formState.errors.idPropriedade?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            placeholder="Quantidade de Sacas durante Safra"
            required
            {...register("Sacas_Safra")}
            error={!!formState.errors.Sacas_Safra}
            helperText={formState.errors.Sacas_Safra?.message}
          />
        </Grid>
        <Grid xs={4} item>
          <TextField
            type="number"
            placeholder="Umidade da Safra - Percentual"
            required
            {...register("Umidade_Safra")}
            error={!!formState.errors.Umidade_Safra}
            helperText={formState.errors.Umidade_Safra?.message}
          />
        </Grid>

        <Grid xs={4} item>
          <TextField
            placeholder="Desconto de impureza da Safra - Percentual"
            required
            type="number"
            {...register("Desconto_Impureza_Safra")}
            error={!!formState.errors.Desconto_Impureza_Safra}
            helperText={formState.errors.Desconto_Impureza_Safra?.message}
          />
        </Grid>

        <Grid xs={6} item>
          <TextField
            placeholder="Quantidades de Sacas durante Safrinha"
            required
            type="number"
            {...register("Sacas_Safrinha")}
            error={!!formState.errors.Sacas_Safrinha}
            helperText={formState.errors.Sacas_Safrinha?.message}
          />
        </Grid>
        <Grid xs={4} item>
          <TextField
            placeholder="Umidade da Safrinha - Percentual"
            required
            type="number"
            {...register("Umidade_Safrinha")}
            error={!!formState.errors.Umidade_Safrinha}
            helperText={formState.errors.Umidade_Safrinha?.message}
          />
        </Grid>
        <Grid xs={4} item>
          <TextField
            placeholder="Desconto de impureza da Safrinha - Percentual"
            required
            type="number"
            {...register("Desconto_Impureza_Safrinha")}
            error={!!formState.errors.Desconto_Impureza_Safrinha}
            helperText={formState.errors.Desconto_Impureza_Safrinha?.message}
          />
        </Grid>

        <Grid xs={4} item>
          <TextField
            placeholder="O valor da saca a ser calculado"
            required
            type="number"
            {...register("ValorSaca")}
            error={!!formState.errors.ValorSaca}
            helperText={formState.errors.ValorSaca?.message}
          />
        </Grid>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={carregando}
          >
            Salvar
          </Button>
        </Box>
      </Grid>
    </form>
  );
}
