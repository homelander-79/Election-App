import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts"

const CondidateForm = ({ condidate, electionNumber }) => {
    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }
    const data = [
        {
            name: "not nominate",
            value: electionNumber - condidate[3],
        },
        { name: "nominated", value: condidate[3] - condidate[4] },
        { name: "wins", value: parseInt(condidate[4]) },
    ]
    const COLORS = ["#AEAEAE", "#EE4B2B", "#00C49F"]
    console.log(data[0])
    return (
        <div className="min-h-[76vh] flex  justify-center items-center  ">
            <div className="relative   min-h-[60vh] ml-5 mr-5 mb-10 mt-10 p-10">
                <div className="mb-10">
                    <p className="mb-10 text-7xl">{condidate[0].toString()} </p>
                    <p className="leading-relaxed mb-5 font-mono">
                        {condidate[1].toString()}
                    </p>
                    <div className="font-serif">
                        <span className="text-xl mr-2">party :</span>
                        <span className="ml-3"> {condidate[2].toString()}</span>
                    </div>
                    <div className="h-24"></div>
                </div>

                <div className="h-48 w-72 absolute bottom-0 right-0 ">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                labelLine={false}
                                outerRadius={80}
                                dataKey="value"
                                label={renderCustomizedLabel}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default CondidateForm
