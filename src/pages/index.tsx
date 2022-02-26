import { useEffect, useState } from "react"
import Botao from "../components/Botao"
import Formulario from "../components/Formulario"
import Layout from "../components/Layout"
import Tabela from "../components/Tabela"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import ColecaoCliente from "../../backend/db/ColecaoCliente"

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  console.log("Clientes: ", clientes)

  useEffect(obterTodos, [])

  function obterTodos() {
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      setVisivel('tabela')
    })
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }

  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }

  function novoCliente(cliente: Cliente) {
    console.log("Novo Cliente - Botão - cliquei de verdade")
    setCliente(Cliente.vazio())
    setVisivel('form')
    console.log(setCliente, setVisivel)
  }

  return (
    <div className={
      "bg-gradient-to-r from-purple-600 to-blue-700 flex h-screen items-center justify-center text-white"
    }>
      <Layout titulo='Cadastro Simples'>
        {visivel === 'tabela' ?
          <>
            <div className="flex justify-end">
              <Botao cor='green'
                className="mb-4"
                onClick={() => novoCliente(Cliente.vazio())}
              >
              Novo Cliente</Botao>
            </div>
            <Tabela clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido} />
          </>
        :
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')}
          />
        }
      </Layout>
    </div>
  )
}
