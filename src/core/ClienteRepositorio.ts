import Cliente from "./Cliente";

export default interface ClienteRepositorio {
    salvar(cliente: Cliente): Promise<Cliente>
    excluir(ciente: Cliente): Promise<void>
    obterTodos(): Promise<Cliente[]>
}