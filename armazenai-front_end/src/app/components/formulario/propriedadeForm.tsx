import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const errorsPropriedadeForm = {
  deveSerNumero: "Este campo deve ser um número!",
};

// Isso cria o schema do formulário, ou seja, a estrutura base do nosso form.
const schemaPropriedadeForm = yup.object({
  nome: yup.string().required("O nome da propriedade é obrigatório!"),
  endereco: yup.string().required("O endereço é obrigatório!"),
  areaDisponivel: yup.number().required("A área da propriedade é obrigatória!"),
  producaoSoja: yup.number(),
  hectaresSoja: yup.number(),
  umidadeMediaSoja: yup.number(),
  producaoMilho: yup.number(),
  hectaresMilho: yup.number(),
  umidadeMediaMilho: yup.number(),
});

// Criamos e exportamos o tipo do formulário, para que o useForm tenha uma tipagem padrão
export type FormularioPropriedade = yup.InferType<typeof schemaPropriedadeForm>;

type PropriedadeFormularioProps = {
  enviaDadosFormulario: (dataFormulario: FormularioPropriedade) => any;
  carregando: boolean;
};

export default function PropriedadeFormulario({
  enviaDadosFormulario,
  carregando,
}: PropriedadeFormularioProps) {
  // O useForm é um hook da biblioteca react-hook-form. Esse hook retorna algumas propriedades.
  // FormState - Esse formState é onde acessamos o estado do formulário para checarmos se há erros, e pegar as mensagens de error.
  // HandleSubmit - É uma função que o hook form cria, essa função é chamada quando nosso formulário é submetido (pelo botao).
  // Register  - Essa função registra um campo html ao nosso campo do formulário criado no yup.
  // Control -  Esse control é uma forma de debugar o formulário, ele mostra todas as informações do formulário, em tempo real.
  const { formState, handleSubmit, control, register } =
    useForm<FormularioPropriedade>({
      resolver: yupResolver(schemaPropriedadeForm),
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
            placeholder="Nome da propriedade"
            required
            {...register("nome")}
            error={!!formState.errors.nome}
            helperText={formState.errors.nome?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            placeholder="Endereco da propriedade"
            required
            {...register("endereco")}
            error={!!formState.errors.endereco}
            helperText={formState.errors.endereco?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            type="number"
            placeholder="Area da propriedade"
            required
            {...register("areaDisponivel")}
            error={!!formState.errors.areaDisponivel}
            helperText={formState.errors.areaDisponivel?.message}
          />
        </Grid>

        <Grid xs={6} item>
          <TextField
            placeholder="Producao de Soja da propriedade"
            required
            type="number"
            {...register("producaoSoja")}
            error={!!formState.errors.producaoSoja}
            helperText={formState.errors.producaoSoja?.message}
          />
        </Grid>

        <Grid xs={6} item>
          <TextField
            placeholder="Hectares de Soja da propriedade"
            required
            type="number"
            {...register("hectaresSoja")}
            error={!!formState.errors.hectaresSoja}
            helperText={formState.errors.hectaresSoja?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            placeholder="Umidade de Soja da propriedade"
            required
            type="number"
            {...register("umidadeMediaSoja")}
            error={!!formState.errors.umidadeMediaSoja}
            helperText={formState.errors.umidadeMediaSoja?.message}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            placeholder="Producao de Milho da propriedade"
            required
            type="number"
            {...register("producaoMilho")}
            error={!!formState.errors.producaoMilho}
            helperText={formState.errors.producaoMilho?.message}
          />
        </Grid>

        <Grid xs={6} item>
          <TextField
            placeholder="Hectares de Milho da propriedade"
            required
            type="number"
            {...register("hectaresMilho")}
            error={!!formState.errors.hectaresMilho}
            helperText={formState.errors.hectaresMilho?.message}
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            placeholder="Umidade de Milho da propriedade"
            type="number"
            required
            {...register("umidadeMediaMilho")}
            error={!!formState.errors.umidadeMediaMilho}
            helperText={formState.errors.umidadeMediaMilho?.message}
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
