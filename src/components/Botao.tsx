interface BotaoProps {
    cor?: 'green' | 'blue' | 'grey'
    className?: string
    children: any
    onClick?: () => void
}

export default function Botao(props: BotaoProps) {
    const cor = props.cor ?? 'gray'
    console.log('Apertei Botão', props)
    return (
        <button
            onClick={props.onClick}
            className=
            {`bg-gradient-to-r from-green-700 to-green-500 text-white px-4 py-2 rounded-md font-bold ${props.className}`}>
            {props.children}
        </button>
    )
}