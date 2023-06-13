import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
];
