export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cliente: {
        Row: {
          cnpj: string
          created_at: string | null
          email: string
          id: number
          nome: string
          telefone: string
        }
        Insert: {
          cnpj: string
          created_at?: string | null
          email: string
          id?: number
          nome: string
          telefone: string
        }
        Update: {
          cnpj?: string
          created_at?: string | null
          email?: string
          id?: number
          nome?: string
          telefone?: string
        }
        Relationships: []
      }
      cliente_propriedade: {
        Row: {
          cliente_id: number | null
          created_at: string | null
          id: number
          propriedade_id: number
        }
        Insert: {
          cliente_id?: number | null
          created_at?: string | null
          id?: number
          propriedade_id: number
        }
        Update: {
          cliente_id?: number | null
          created_at?: string | null
          id?: number
          propriedade_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cliente_propriedade_cliente_id_fkey"
            columns: ["cliente_id"]
            referencedRelation: "cliente"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cliente_propriedade_propriedade_id_fkey"
            columns: ["propriedade_id"]
            referencedRelation: "propriedade"
            referencedColumns: ["id"]
          }
        ]
      }
      etapa_contratacao: {
        Row: {
          concluido: boolean
          created_at: string | null
          id: number
          preco: number
        }
        Insert: {
          concluido: boolean
          created_at?: string | null
          id?: number
          preco?: number
        }
        Update: {
          concluido?: boolean
          created_at?: string | null
          id?: number
          preco?: number
        }
        Relationships: []
      }
      etapa_execucao_obra: {
        Row: {
          concluido: boolean
          created_at: string | null
          id: number
        }
        Insert: {
          concluido: boolean
          created_at?: string | null
          id?: number
        }
        Update: {
          concluido?: boolean
          created_at?: string | null
          id?: number
        }
        Relationships: []
      }
      etapa_feedback_cliente: {
        Row: {
          concluido: boolean
          created_at: string | null
          feedback: string
          id: number
          nota: number
        }
        Insert: {
          concluido: boolean
          created_at?: string | null
          feedback: string
          id?: number
          nota?: number
        }
        Update: {
          concluido?: boolean
          created_at?: string | null
          feedback?: string
          id?: number
          nota?: number
        }
        Relationships: []
      }
      etapa_orcamento: {
        Row: {
          capacidade_secador: number | null
          capacidade_silo: number | null
          concluido: boolean
          created_at: string | null
          id: number
          valor_total_negociado: number | null
        }
        Insert: {
          capacidade_secador?: number | null
          capacidade_silo?: number | null
          concluido: boolean
          created_at?: string | null
          id?: number
          valor_total_negociado?: number | null
        }
        Update: {
          capacidade_secador?: number | null
          capacidade_silo?: number | null
          concluido?: boolean
          created_at?: string | null
          id?: number
          valor_total_negociado?: number | null
        }
        Relationships: []
      }
      pedido: {
        Row: {
          cliente_id: number
          created_at: string
          id: number
          tipo_servico: string
        }
        Insert: {
          cliente_id: number
          created_at?: string
          id?: number
          tipo_servico: string
        }
        Update: {
          cliente_id?: number
          created_at?: string
          id?: number
          tipo_servico?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedido_cliente_id_fkey"
            columns: ["cliente_id"]
            referencedRelation: "cliente"
            referencedColumns: ["id"]
          }
        ]
      }
      pedido_etapa: {
        Row: {
          cancelado: boolean
          concluido: boolean
          created_at: string | null
          etapa_contratacao: number | null
          etapa_execucao: number | null
          etapa_feedback: number | null
          id: number
          pedido: number
        }
        Insert: {
          cancelado: boolean
          concluido: boolean
          created_at?: string | null
          etapa_contratacao?: number | null
          etapa_execucao?: number | null
          etapa_feedback?: number | null
          id?: number
          pedido: number
        }
        Update: {
          cancelado?: boolean
          concluido?: boolean
          created_at?: string | null
          etapa_contratacao?: number | null
          etapa_execucao?: number | null
          etapa_feedback?: number | null
          id?: number
          pedido?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedido_etapa_etapa_contratacao_fkey"
            columns: ["etapa_contratacao"]
            referencedRelation: "etapa_contratacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_etapa_etapa_execucao_fkey"
            columns: ["etapa_execucao"]
            referencedRelation: "etapa_execucao_obra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_etapa_etapa_feedback_fkey"
            columns: ["etapa_feedback"]
            referencedRelation: "etapa_feedback_cliente"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_etapa_pedido_fkey"
            columns: ["pedido"]
            referencedRelation: "pedido"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          cpf: string | null
          id: string
          nome: string | null
          role: number | null
          telefone: string | null
        }
        Insert: {
          cpf?: string | null
          id: string
          nome?: string | null
          role?: number | null
          telefone?: string | null
        }
        Update: {
          cpf?: string | null
          id?: string
          nome?: string | null
          role?: number | null
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_role_fkey"
            columns: ["role"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
      propriedade: {
        Row: {
          area_disponivel: number
          created_at: string | null
          endereco: string
          hectares_milho: number | null
          hectares_soja: number | null
          id: number
          nome: string
          producao_milho: number | null
          producao_soja: number | null
          umidade_media_milho: number | null
          umidade_media_soja: number | null
        }
        Insert: {
          area_disponivel: number
          created_at?: string | null
          endereco: string
          hectares_milho?: number | null
          hectares_soja?: number | null
          id?: number
          nome: string
          producao_milho?: number | null
          producao_soja?: number | null
          umidade_media_milho?: number | null
          umidade_media_soja?: number | null
        }
        Update: {
          area_disponivel?: number
          created_at?: string | null
          endereco?: string
          hectares_milho?: number | null
          hectares_soja?: number | null
          id?: number
          nome?: string
          producao_milho?: number | null
          producao_soja?: number | null
          umidade_media_milho?: number | null
          umidade_media_soja?: number | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
