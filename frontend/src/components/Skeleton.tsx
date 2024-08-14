export const Skeleton = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="animate-pulse">{children}</div>
    )
}

const List = () => {
    return (
        Array(5).fill("").map((_, i) => (
            <ListItem key={i} />
        ))
    )
}

const ListItem = () => {
    return (
        <tr className="animate-pulse" >
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-circle h-12 w-12 bg-slate-500">
                            <img
                                src={""}
                                alt={""} />
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <div className="font-bold truncate w-24 rounded-md h-3 bg-slate-500"></div>
                        <div className="text-sm opacity-50 w-16 h-3 rounded-md bg-slate-500"></div>
                    </div>
                </div>
            </td>

            <td>
                <div className="opacity-80 w-8 h-3 rounded-md bg-slate-500"></div>
            </td>
            <td className="">
                <div className="w-8 h-3 rounded-md bg-slate-500"></div>
            </td>
        </tr>
    )
}

Skeleton.List = List;

export default Skeleton