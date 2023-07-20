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

type ClienteTableOrc = {
    id: number;
    nome: string;
    telefone: string;
    email: string;
  };

export default function OrcamentoPage(){

    const supabase = createClientComponentClient<Database>();
    const [clientesOrc, setClientesOrc] = useState<ClienteTableOrc[]>([]);

    
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
                <Button> Gerar Orçamento </Button>
              </TableCell>

            </TableRow>
          
          ))}
        </TableBody>
            </Table>
            </TableContainer>
        </BasePage>
    )
}