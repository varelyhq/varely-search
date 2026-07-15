import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Screen({ children }: Props) {
    return (
        <div className="flex-1 flex flex-col p-6">
            {children}
        </div>
    )
}