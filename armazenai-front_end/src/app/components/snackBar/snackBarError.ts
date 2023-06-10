import { OptionsWithExtraProps, enqueueSnackbar } from "notistack";

export default function snackBarErro(mensagem: string, props? : OptionsWithExtraProps<"error">) {
  enqueueSnackbar(mensagem,{...props, variant: "error", autoHideDuration: 2000});
}
