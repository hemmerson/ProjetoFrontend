import axios from 'axios';
import { Projeto } from '@/types';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
});

export class UsuarioService {
    async listarTodos(): Promise<{ data: Projeto.Usuario[] }> {
        try {
            const response = await axiosInstance.get<Projeto.Usuario[]>("/usuarios");
            return response;
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            return { data: [] };
        }
    }

    async buscarUsuarioPorId(id: number): Promise<{ data: Projeto.Usuario }> {
        return axiosInstance.get(`/usuarios/${id}`);
    }

    async inserir(usuario: Projeto.Usuario): Promise<{ data: Projeto.Usuario[] }> {
        try {
            await axiosInstance.post("/usuarios", usuario);
            // Após inserir, busca a lista atualizada
            return this.listarTodos();
        } catch (error) {
            console.error('Erro ao inserir usuário:', error);
            throw error;
        }
    }

    async alterar(usuario: Projeto.Usuario): Promise<{ data: Projeto.Usuario[] }> {
        try {
            await axiosInstance.put("/usuarios", usuario);
            // Após alterar, busca a lista atualizada
            return this.listarTodos();
        } catch (error) {
            console.error('Erro ao alterar usuário:', error);
            throw error;
        }
    }

    async excluir(id: number): Promise<{ data: Projeto.Usuario[] }> {
        try {
            await axiosInstance.delete(`/usuarios/${id}`);
            // Após excluir, busca a lista atualizada
            return this.listarTodos();
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            throw error;
        }
    }
}
