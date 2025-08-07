'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

interface ObservationEntry {
  Date: string
  weatherElements: {
    Precipitation: string
  }
}

interface LocationData {
  station: {
    StationName: string
  }
  stationObsTimes: {
    stationObsTime: ObservationEntry[]
  }
}

interface APIResponse {
  records: {
    location: LocationData[]
  }
}
// 定義圖表資料的類型
type RainData = {
  date: string
  臺北: number
  新北: number
}

export default function ChartPanel() {
  const [data, setData] = useState<RainData[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/weather')
        const json: APIResponse = await res.json() 

        const dailyRainMap = new Map<string, RainData>()
        
        for (const location of json.records.location) {
          const cityName = location.station.StationName
          if (cityName !== '臺北' && cityName !== '新北') continue

          for (const entry of location.stationObsTimes.stationObsTime) {
            const date = entry.Date
            const value = entry.weatherElements.Precipitation
            const num = value === 'T' ? 0 : parseFloat(value)

            if (!isNaN(num)) {
              if (!dailyRainMap.has(date)) {
                dailyRainMap.set(date, { date, 臺北: 0, 新北: 0 })
              }
              dailyRainMap.get(date)![cityName as '臺北' | '新北'] += num
            }
          }
        }

        const chartData = Array.from(dailyRainMap.values()).sort((a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        setData(chartData.slice(-7))

      } catch (err) {
        console.error("Fetch或資料處理發生錯誤：", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2 style={{ textAlign: 'center' }}>臺北 vs 新北近七日每日降雨量 (mm)</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="臺北" fill="#8884d8" stackId="a" />
          <Bar dataKey="新北" fill="#82ca9d" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}