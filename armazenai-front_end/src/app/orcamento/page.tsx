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
  idCliente: number;
  idPropriedade: number;
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
    const [clientesEPropriedades, setClientesEPropriedades] = useState<Clientes_Propriedades>({idCliente: 0, idPropriedade:0});
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

    const getDadosPropriedade = useCallback(async (id:number) => {
      const {data: propriedadeData, error } = await supabase
        .from("propriedade")
        .select('producao_milho, producao_soja, umidade_media_soja, umidade_media_milho')
        .returns<Propriedades>();
        if (propriedadeData) {
          setPropriedades(propriedadeData);
        }
        if (error) console.log(error);
      }, [supabase]);

    const getIdCLiente_Propriedade = useCallback(async (id:number) => {
      const { data: idClientePropriedadeData, error } = await supabase
          .from("cliente_propriedade")
          .select(`cliente_id, propriedade_id`)
          .eq('cliente_id',id)
          .returns<Clientes_Propriedades>();
        if (idClientePropriedadeData) {
          setClientesEPropriedades(idClientePropriedadeData);
          getDadosPropriedade(clientesEPropriedades.idPropriedade)
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