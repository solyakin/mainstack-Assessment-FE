type Tx = {
    id: string
    title: string
    subtitle?: string
    amount: string
    date: string
    type: 'in' | 'out'
    status?: 'successful' | 'pending'
}

type MultiProps = {
    options: string[]
    placeholder?: string
}

type Props = {
    open: boolean
    onClose: () => void
}