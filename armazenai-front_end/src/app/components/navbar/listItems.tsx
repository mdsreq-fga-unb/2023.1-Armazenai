import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import * as React from "react";

type ItemMenu = {
  icon: React.ReactNode;
  nome: string;
  path: string;
};

export const mainListItems: ItemMenu[] = [
  {
    icon: <DashboardIcon />,
    nome: "Dashboard",
    path: "/dashboard",
  },
  // {
  //   icon: <HistoryIcon />,
  //   nome: "Preço Histórico",
  //   path: "/preco-historico",
  // },
  // {
  //   icon: <PeopleIcon />,
  //   nome: "Relatórios",
  //   path: "/relatorios",
  // },
  {
    icon: <PeopleIcon />,
    nome: "Clientes",
    path: "/cliente",
  },
  {
    icon: <AccountCircleIcon />,
    nome: "Perfil",
    path: "/perfil",
  },
  {
    icon: <GroupIcon />,
    nome: "Usuários",
    path: "/usuarios",
  },
  {
    icon: <GroupIcon />,
    nome: "Pedidos",
    path: "/pedidos",
  },
];
