"use client"
import { Button, Container, Dialog, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Database } from "../../../public/types/database";
import ModalForm from "../components/modal/modal-form";
import BasePage from "../components/navbar/basePage";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { type } from "os";

type ClienteTableOrc = {
    id: number;
    nome: string;
    telefone: string;
    email: string;
  };

type Clientes_Propriedades ={
  id: number;
  created_at: string;
  cliente_id: number;
  propriedade_id: number;
}

type Propriedades = {
  producao_milho : number;
  producao_soja : number;
  umidade_media_soja : number;
  umidade_media_milho : number;
}
 // precisarei adicionar Descontro prestador, taxa operacional, input para desconto de impureza, input para custo de frete

export default function OrcamentoPage(){

    const supabase = createClientComponentClient<Database>();
    const [clientesOrc, setClientesOrc] = useState<ClienteTableOrc[]>([]);
    const [clientesEPropriedades, setClientesEPropriedades] = useState<Clientes_Propriedades>({propriedade_id:0 , cliente_id:0, id:0, created_at:''});
    const [propriedades, setPropriedades] = useState<Propriedades>({producao_milho:0, producao_soja:0, umidade_media_soja:0, umidade_media_milho:0});

    
    const getClientes = useCallback(async () => {
        const { data: clienteData, error } = await supabase
          .from("cliente")
          .select(`id, nome, telefone , email`)
          .returns<ClienteTableOrc[]>();
        if (clienteData) {
          setClientesOrc(clienteData);
        }
        if (error) console.log(error);
      }, [supabase]);

    getClientes();

    function geraDadosArquivo (data:Propriedades) {
        //Soja - Prestador Serviço
        let desconto_prestador_soja = ((((data.umidade_media_soja - 14.5) / 0.5 ) * 0.75 ) + 1 );
        
        let taxa_operacional_soja = 0;
          if (data.umidade_media_soja == 14){
            taxa_operacional_soja = 0.3;
          }
          else if(data.umidade_media_soja >= 14.5 && data.umidade_media_soja < 18){
            taxa_operacional_soja = ((((data.umidade_media_soja - 14.5) / 0.5 ) * 0.01 ) + 0.43 )
          }
          else if(data.umidade_media_soja >= 18 && data.umidade_media_soja < 19){
            taxa_operacional_soja = ((((data.umidade_media_soja - 18) / 0.5 ) * 0.01 ) + 0.56 )
          }
          else if(data.umidade_media_soja >= 19 && data.umidade_media_soja < 20){
            taxa_operacional_soja = ((((data.umidade_media_soja - 19) / 0.5 ) * 0.01 ) + 0.61 )
          }
          else if(data.umidade_media_soja >= 20 && data.umidade_media_soja < 26){
            taxa_operacional_soja = ((((data.umidade_media_soja - 20) / 0.5 ) * 0.01 ) + 0.64 )
          }
          else if (data.umidade_media_soja == 26.5){
            taxa_operacional_soja = 0.8
          }
          else if (data.umidade_media_soja == 27){
            taxa_operacional_soja = 0.82
          }
          else if (data.umidade_media_soja == 27.5){
            taxa_operacional_soja = 0.84
          }
          else if(data.umidade_media_soja >= 28){
            taxa_operacional_soja = ((((data.umidade_media_soja - 28) / 0.5 ) * 0.01 ) + 0.86 )
          }

          let receitaSafraSoja = ((data.producao_soja) - ((data.producao_soja * desconto_prestador_soja) / 100.0) - ((data.producao_soja * taxa_operacional_soja) / 100.0)) * 100.0;
            //Milho - Prestador Serviço
          let desconto_prestador_milho = ((((data.umidade_media_milho - 14.5) / 0.5 ) * 0.75 ) + 1 );
        
        let taxa_operacional_milho = 0;
          if (data.umidade_media_milho == 14){
            taxa_operacional_milho = 0.3;
          }
          else if(data.umidade_media_milho >= 14.5 && data.umidade_media_milho < 18){
            taxa_operacional_milho = ((((data.umidade_media_milho - 14.5) / 0.5 ) * 0.01 ) + 0.43 )
          }
          else if(data.umidade_media_milho >= 18 && data.umidade_media_milho < 19){
            taxa_operacional_milho = ((((data.umidade_media_milho - 18) / 0.5 ) * 0.01 ) + 0.56 )
          }
          else if(data.umidade_media_milho >= 19 && data.umidade_media_milho < 20){
            taxa_operacional_milho = ((((data.umidade_media_milho - 19) / 0.5 ) * 0.01 ) + 0.61 )
          }
          else if(data.umidade_media_milho >= 20 && data.umidade_media_milho < 26){
            taxa_operacional_milho = ((((data.umidade_media_milho - 20) / 0.5 ) * 0.01 ) + 0.64 )
          }
          else if (data.umidade_media_milho == 26.5){
            taxa_operacional_milho = 0.8
          }
          else if (data.umidade_media_milho == 27){
            taxa_operacional_milho = 0.82
          }
          else if (data.umidade_media_milho == 27.5){
            taxa_operacional_milho = 0.84
          }
          else if(data.umidade_media_milho >= 28){
            taxa_operacional_milho = ((((data.umidade_media_milho - 28) / 0.5 ) * 0.1 ) + 0.86 )
          }

          let receitaSafraMilho = ((data.producao_milho) - (data.producao_milho * desconto_prestador_milho / 100) - (data.producao_milho * taxa_operacional_milho / 100)) * 100.0;

          //////
          // Soja - Armazenagem
          let desconto_unidade_soja = 0;
            if (data.umidade_media_soja <= 14){
              desconto_unidade_soja = 0;
            }
            else{
              desconto_unidade_soja = (data.umidade_media_soja - 14.0);
            }

            let taxa_op_unidade_soja = 0;
          if (data.umidade_media_soja == 14){
            taxa_op_unidade_soja = 0.3  / 3.5;
          }
          else if(data.umidade_media_soja >= 14.5 && data.umidade_media_soja < 18){
            taxa_op_unidade_soja = ((((data.umidade_media_soja - 14.5) / 0.5 ) * 0.01 ) + 0.43 )  / 3.5;
          }
          else if(data.umidade_media_soja >= 18 && data.umidade_media_soja < 19){
            taxa_op_unidade_soja = ((((data.umidade_media_soja - 18) / 0.5 ) * 0.01 ) + 0.56 )  / 3.5;
          }
          else if(data.umidade_media_soja >= 19 && data.umidade_media_soja < 20){
            taxa_op_unidade_soja = ((((data.umidade_media_soja - 19) / 0.5 ) * 0.01 ) + 0.61 )  / 3.5;
          }
          else if(data.umidade_media_soja >= 20 && data.umidade_media_soja < 26){
            taxa_op_unidade_soja = ((((data.umidade_media_soja - 20) / 0.5 ) * 0.01 ) + 0.64 )  / 3.5;
          }
          else if (data.umidade_media_soja == 26.5){
            taxa_op_unidade_soja = 0.8  / 3.5;
          }
          else if (data.umidade_media_soja == 27){
            taxa_op_unidade_soja = 0.82  / 3.5;
          }
          else if (data.umidade_media_soja == 27.5){
            taxa_op_unidade_soja = 0.84  / 3.5;
          }
          else if(data.umidade_media_soja >= 28){
            taxa_op_unidade_soja = ((((data.umidade_media_soja - 28) / 0.5 ) * 0.1 ) + 0.86 ) / 3.5;
          }

          let receitaSafraSoja_armazenagem = ((data.producao_soja) - (data.producao_soja * desconto_unidade_soja / 100) - (data.producao_soja * taxa_op_unidade_soja / 100)) * 100.0;

          // Milho - Armazenagem

          let desconto_unidade_milho = 0;
            if (data.umidade_media_soja <= 14){
              desconto_unidade_milho = 0;
            }
            else{
              desconto_unidade_milho = (data.umidade_media_milho - 14.0);
            }

            let taxa_op_unidade_milho = 0;
          if (data.umidade_media_milho == 14){
            taxa_op_unidade_milho = 0.3 / 3.5;
          }
          else if(data.umidade_media_milho >= 14.5 && data.umidade_media_milho < 18){
            taxa_op_unidade_milho = ((((data.umidade_media_milho - 14.5) / 0.5 ) * 0.01 ) + 0.43 )  / 3.5;
          }
          else if(data.umidade_media_milho >= 18 && data.umidade_media_milho < 19){
            taxa_op_unidade_milho = ((((data.umidade_media_milho - 18) / 0.5 ) * 0.01 ) + 0.56 )  / 3.5;
          }
          else if(data.umidade_media_milho >= 19 && data.umidade_media_milho < 20){
            taxa_op_unidade_milho = ((((data.umidade_media_milho - 19) / 0.5 ) * 0.01 ) + 0.61 )  / 3.5;
          }
          else if(data.umidade_media_milho >= 20 && data.umidade_media_milho < 26){
            taxa_op_unidade_milho = ((((data.umidade_media_milho - 20) / 0.5 ) * 0.01 ) + 0.64 )  / 3.5;
          }
          else if (data.umidade_media_milho == 26.5){
            taxa_op_unidade_milho = 0.8  / 3.5;
          }
          else if (data.umidade_media_milho == 27){
            taxa_op_unidade_milho = 0.82  / 3.5;
          }
          else if (data.umidade_media_milho == 27.5){
            taxa_op_unidade_milho = 0.84  / 3.5;
          }
          else if(data.umidade_media_milho >= 28){
            taxa_op_unidade_milho = ((((data.umidade_media_milho - 28) / 0.5 ) * 0.01 ) + 0.86 ) / 3.5;
          }

          let receitaSafraMilho_armazenagem = ((data.producao_milho) - (data.producao_milho * desconto_unidade_milho / 100) - (data.producao_milho * taxa_op_unidade_milho / 100)) * 100.0;
          // test area

          //
      return (data.producao_soja, desconto_prestador_soja, taxa_operacional_soja, receitaSafraSoja, data.producao_milho, desconto_prestador_milho, taxa_operacional_milho, receitaSafraMilho,
        desconto_unidade_soja, taxa_op_unidade_soja, receitaSafraSoja_armazenagem, desconto_unidade_milho, taxa_op_unidade_milho, receitaSafraMilho_armazenagem);
    }

    const getDadosPropriedade = useCallback(async (id:number) => {
      const {data: propriedadeData, error } = await supabase
        .from("propriedade")
        .select('producao_milho, producao_soja, umidade_media_soja, umidade_media_milho')
        .eq('id',id)
        .single<Propriedades>();
        if (propriedadeData) {
          setPropriedades(propriedadeData);
          geraDadosArquivo(propriedadeData);
        }
        if (error) console.log(error);
      }, [supabase]);

    const getIdCLiente_Propriedade = useCallback(async (id:number) => {
      const { data: idClientePropriedadeData, error } = await supabase
          .from("cliente_propriedade")
          .select("*, cliente(*), propriedade(*)")
          .eq('cliente_id',id)
          .single<Clientes_Propriedades>();
        if (idClientePropriedadeData) {
          setClientesEPropriedades(idClientePropriedadeData);
          getDadosPropriedade(idClientePropriedadeData.propriedade_id);
           }
        if (error) console.log(error);
      }, [supabase]);
   


    return(
        <BasePage labelNavBar="Orçamento">
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Tabela Clientes">
                    <TableHead>
                <TableRow>
                    <TableCell> ID </TableCell>
                    <TableCell> Nome </TableCell>
                    <TableCell> Telefone </TableCell>
                    <TableCell> E-mail </TableCell>
                    <TableCell>  </TableCell>
             </TableRow>
            </TableHead>
            <TableBody>
          {clientesOrc.map((cliente) => (
            <TableRow
            key={cliente.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
              <TableCell component="th" scope="row">
              {cliente.id}
              </TableCell>
              <TableCell>
                {cliente.nome}
              </TableCell>
              <TableCell>
                {cliente.telefone}
              </TableCell>
              <TableCell>
                {cliente.email}
              </TableCell>
              <TableCell>
                <Button onClick={() => getIdCLiente_Propriedade(cliente.id)}> Gerar Orçamento </Button>
              </TableCell>

            </TableRow>
          
          ))}
        </TableBody>
            </Table>
            </TableContainer>
        </BasePage>
    )
}