import React, { useEffect, useState } from 'react'
import axios from '../../axios/ProductsAxios';

import { motion } from 'framer-motion';

import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
}
    from 'recharts';
const Income = ({ user }) => {

    const [total, SetTotal] = useState([]);


    useEffect(() => {
        axios.getTotal(SetTotal)


    }, [])
    var month = ["en.", "febr.", "mzo.", "abr.", "my.", "jun.", "jul.", "agt.", "sept.", "oct.", "nov.", "dic."];

    const data = [];
    if (total['total']) {
        if (total['total'].length > 0) {
            for (let i = 0; i < 12; i++) {
                const date = month[i];
                const value = total.total[i];
                data.push({ date, value });
            }
        }
    }

    return (
        data && user.is_staff ?
            <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className=" separate ">
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={500}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#2451B7" stopOpacity={.55}></stop>
                                        <stop offset="75%" stopColor="#2451B7" stopOpacity={.15}></stop>
                                    </linearGradient>
                                </defs>
                                <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                <YAxis dataKey="value" axisLine={false} tickLine={false} tickCount={8} tickFormatter={number => `$${number}`} />
                                <Tooltip content={<CustomTooltip />} />
                                <CartesianGrid opacity={0.5} vertical={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>
            : null
    )
}

function CustomTooltip({ active, payload, label }) {

    if (active && payload && label) {
        return (
            <div className="tooltip">
                <h4>{label}</h4>
                <p>${payload[0].value}</p>
            </div>
        )
    }
    return null;
}

export default Income
