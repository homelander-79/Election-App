import Link from "next/link"

import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Tooltip,
    Legend,
} from "recharts"

const ElectionById = ({ feed }) => {
    const status = feed[5] == "-1" ? "Ongoing" : "Ended"
    const result = feed[5] == "0" ? "Draw" : feed[5]

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

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

    let i = -1
    let j = 0
    const data = feed[3].map((d) => {
        i += 1
        return { name: d, value: parseInt(feed[4][i][1]) }
    })

    const candidate = feed[3].map((candidate) => {
        j += 1
        console.log(COLORS[j])
        return (
            <div>
                <Link
                    key={j}
                    className={`m-3 text-[${COLORS[j]}]`}
                    href={`/directory/condidates/${candidate}`}
                >
                    {candidate}
                </Link>
            </div>
        )
    })

    return (
        <div className="flex flex-col">
            <div className=" p-16">
                <p className="mb-8  text-5xl">{feed[1]} </p>
                <p className="mb-8  text-3xl">{feed[2]}</p>

                <p>Status : {status} </p>
                {status == "Ended" ? <p> Winner : {result} </p> : <p>Draw</p>}
            </div>
            <div className="h-52 w-72 self-end flex flex-col justify-center items-center">
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
                <div className="flex pt-3">{candidate}</div>
            </div>
        </div>
    )
}

export default ElectionById
