import { PureComponent } from 'react';
import Data from './testdata1.json';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';

const frequent = "5006"//周波数を格納する変数　ここにユーザーが選択した周波数を格納したい
const place = "chiba"//観測所の名前を格納する変数　ここにどこのデータを持ってきたかの情報を格納する

type Point = {x:number,y:number}
export type PointList = Point[] //PointListという変数をオブジェクト型の配列として扱えるように宣言

if(Data === null){
  document.write("No Data")
  console.log("No data")
}

// console.log("No data")

const pointData:PointList = Data.data.map((item) => {
  const {hour,min,sec} = item.time//分割代入
  const shapedHour:number = hour + min / 60 + sec / 3600//時間（hour）に直す

  return {x:shapedHour, y:item.channel[frequent].freq}//map関数で配列にオブジェクトを代入している
})

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 40,
          }}
        >
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="hour" 
            unit="h"  
            domain={["0", "24"]} 
            tickCount={12} 
            tickFormatter={(shapedHour) => shapedHour.toFixed(0)} 
            // label={{
            //   value: "Japanese Standard Time",
            //   position: "center",
            //   fontSize: 25,
            // }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="frequent" 
            unit="Hz" 
            label={{
              value: place,
              position: "insideLeft",
              fontSize: 25,
              angle: -90,
            }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="frequent" data={pointData} fill="#8884d8" />
          <Legend />
          {/* <Customized component={<Dot clipDot cx={1} cy={1} r={0.1} fill="red"/>} /> */}
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}


