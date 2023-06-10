import { OptionsWithExtraProps, enqueueSnackbar } from "notistack";

export default function snackBarSucesso(mensagem: string, props? : OptionsWithExtraProps<"success">) {
  enqueueSnackbar(mensagem,{...props, variant: "success", autoHideDuration: 2000});
}
