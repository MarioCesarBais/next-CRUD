interface BotaoProps {
    cor?: 'green' | 'blue' | 'grey'
    className?: string
    children: any
}

export default function Botao(props: BotaoProps) {
    const cor = props.cor ?? 'gray'
    return (
        <button className=
            {`text-white px-4 py-2 rounded-md bg-gradient-to-r from-${cor}-700 to-${cor}-500 font-bold`}>
            {props.children}
        </button>
    )
}