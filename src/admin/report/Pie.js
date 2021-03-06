import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Line, Bar, Area, LabelList} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];


export default function LaporanPengguna({report}) {

  const data2 = [];
  console.log(report);
  report.map(res=>{
    data2.push({
      name:res.name,
      value: parseInt(res.value)
    })
  })
    return (
      <>
      <PieChart width={400} height={350}>
        <Pie
          data={data2}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
{       
  //  <LabelList dataKey="name" position="top" />
}        </Pie>
        <Legend verticalAlign="bottom" align="center"/>

      </PieChart>
      </>
    );
}
