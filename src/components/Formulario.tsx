import { useState } from "react";
import Entrada from "./Entrada";
import Cliente from '../core/Cliente';
import Botao from './Botao'

interface FormularioProps {
    cliente: Cliente
    cancelado?: () => void
    clienteMudou?: (cliente: Cliente) => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente?.nome ?? "")
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)
    return (
        <div>
            {id ? (
                <Entrada texto='Código' valor={id} somenteLeitura className="mt-10 mb-4" />
            ) : false}
            <Entrada texto='Nome' valor={nome} valorMudou={setNome} className='my-5'/>
            <Entrada texto='Idade' tipo='number' valor={idade} valorMudou={setIdade} className='mb-4' />
            <div className="flex justify-end mt-7 space-x-5">
                <Botao
                    cor='blue'
                    onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}    
                >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}