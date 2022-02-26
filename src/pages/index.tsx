import Botao from "../components/Botao"
import Formulario from "../components/Formulario"
import Layout from "../components/Layout"
import Tabela from "../components/Tabela"
import Cliente from "../core/Cliente"
import useClientes from "../hooks/useClientes"

export default function Home() {

  const {
    cliente,
    clientes,
    novoCliente,
    selecionarCliente,
    excluirCliente,
    salvarCliente,
    tabelaVisivel,
    exibirTabela
  } = useClientes()

  return (
    <div className={
      "bg-gradient-to-r from-purple-600 to-blue-700 flex h-screen items-center justify-center text-white"
    }>
      <Layout titulo='Cadastro Simples'>
        {tabelaVisivel ?
          <>
            <div className="flex justify-end">
              <Botao cor='green'
                className="mb-4"
                onClick={() => novoCliente(Cliente.vazio())}
              >
              Novo Cliente</Botao>
            </div>
            <Tabela clientes={clientes}
              clienteSelecionado={selecionarCliente}
              clienteExcluido={excluirCliente} />
          </>
        :
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => exibirTabela}
          />
        }
      </Layout>
    </div>
  )
}
