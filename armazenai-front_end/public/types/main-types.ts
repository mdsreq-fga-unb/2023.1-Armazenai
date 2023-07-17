export type Cliente = {
  created_at?: string | null;
  email: string;
  id?: number;
  nome: string;
  telefone: string;
  cnpj: string;
};

export type Proprieade = {
  area_disponivel: number;
  created_at?: string | null;
  endereco: string;
  hectares_milho?: number | null;
  hectares_soja?: number | null;
  id?: number;
  nome: string;
  producao_milho?: number | null;
  producao_soja?: number | null;
  umidade_media_milho?: number | null;
  umidade_media_soja?: number | null;
};

export type Pedido = {
  tipo_servico: string;
  cliente_id?: number;
  id: number;
}