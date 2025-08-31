"use client"

import { format } from 'date-fns'
import { Download, TrendingUp } from "lucide-react"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useTemperatureMonitor } from '../../hooks/useTemperatureMonitor'

import { Button } from "../Button/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"

export const description = "Temperature monitoring chart for Remo device"

interface TemperatureChartProps {
  intervalMinutes?: number
  className?: string
  temperatureColor?: string
  humidityColor?: string
  showTemperature?: boolean
  showHumidity?: boolean
}

export function TemperatureChart({ 
  intervalMinutes = 1,
  className,
  temperatureColor = "#FAA0B0",
  humidityColor = "#73D3FA",
  showTemperature: initialShowTemperature = true,
  showHumidity: initialShowHumidity = true
}: TemperatureChartProps) {
  const {
    data,
    isLoading,
    error,
    lastFetch,
  } = useTemperatureMonitor(intervalMinutes)

  const [showTemperature, setShowTemperature] = useState(initialShowTemperature)
  const [showHumidity, setShowHumidity] = useState(initialShowHumidity)

  const exportToCsv = () => {
    if (data.length === 0) {
      alert('エクスポートするデータがありません')
      return
    }

    // CSV ヘッダー
    const headers = ['日時', '温度(°C)', '湿度(%)']
    
    // データ行
    const rows = data.map(item => [
      format(new Date(item.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      item.temperature.toString(),
      item.humidity.toString()
    ])

    // CSV 形式に変換
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    // BOM付きでUTF-8エンコーディング
    const bom = '\uFEFF'
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' })
    
    // ダウンロード
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    
    const now = new Date()
    const filename = `temperature_humidity_${format(now, 'yyyyMMdd_HHmmss')}.csv`
    link.setAttribute('download', filename)
    
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  const chartConfig = {
    temperature: {
      label: "温度 (°C)",
      color: temperatureColor,
    },
    humidity: {
      label: "湿度 (%)",
      color: humidityColor,
    },
  } satisfies ChartConfig

  const chartData = data.map(item => ({
    time: format(new Date(item.timestamp), 'HH:mm'),
    temperature: item.temperature,
    humidity: item.humidity,
    timestamp: item.timestamp,
  }))

  const latestTemperature = data.length > 0 ? data[data.length - 1].temperature : null
  const latestHumidity = data.length > 0 ? data[data.length - 1].humidity : null
  const averageTemperature = data.length > 0 
    ? (data.reduce((sum, item) => sum + item.temperature, 0) / data.length).toFixed(1)
    : null
  const averageHumidity = data.length > 0 
    ? (data.reduce((sum, item) => sum + item.humidity, 0) / data.length).toFixed(1)
    : null

  const temperatureTrend = data.length >= 2 
    ? ((data[data.length - 1].temperature - data[data.length - 2].temperature) / data[data.length - 2].temperature * 100)
    : 0
  
  const humidityTrend = data.length >= 2 
    ? ((data[data.length - 1].humidity - data[data.length - 2].humidity) / data[data.length - 2].humidity * 100)
    : 0

  const temperatureTrendText = temperatureTrend > 0 ? "上昇" : temperatureTrend < 0 ? "下降" : "変化なし"
  const humidityTrendText = humidityTrend > 0 ? "上昇" : humidityTrend < 0 ? "下降" : "変化なし"
  const temperatureTrendPercentage = Math.abs(temperatureTrend).toFixed(1)
  const humidityTrendPercentage = Math.abs(humidityTrend).toFixed(1)

  // 温度と湿度の最高・最低値を計算
  const temperatureValues = data.map(item => item.temperature)
  const humidityValues = data.map(item => item.humidity)
  
  const tempMin = temperatureValues.length > 0 ? Math.min(...temperatureValues) : 0
  const tempMax = temperatureValues.length > 0 ? Math.max(...temperatureValues) : 40
  const humidityMin = humidityValues.length > 0 ? Math.min(...humidityValues) : 0
  const humidityMax = humidityValues.length > 0 ? Math.max(...humidityValues) : 100

  // ±10%の余裕を持たせた表示範囲を計算
  const tempRange = tempMax - tempMin
  const tempPadding = Math.max(tempRange * 0.1, 2) // 最小2度の余裕
  const temperatureDomain = [
    Math.max(0, tempMin - tempPadding),
    tempMax + tempPadding
  ]

  const humidityRange = humidityMax - humidityMin
  const humidityPadding = Math.max(humidityRange * 0.1, 5) // 最小5%の余裕
  const humidityDomain = [
    Math.max(0, humidityMin - humidityPadding),
    Math.min(100, humidityMax + humidityPadding)
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>温湿度監視チャート</CardTitle>
        <CardDescription>
          Remoデバイスからの温度・湿度データを1分間隔で監視・表示
        </CardDescription>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showTemperature}
                onChange={(e) => setShowTemperature(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">温度 (°C)</span>
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: temperatureColor }}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showHumidity}
                onChange={(e) => setShowHumidity(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">湿度 (%)</span>
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: humidityColor }}
              />
            </label>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportToCsv}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            CSV エクスポート
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            エラー: {error}
          </div>
        )}
        
        {isLoading && data.length === 0 ? (
          <div className="flex items-center justify-center h-[350px] text-muted-foreground">
            データを取得中...
          </div>
        ) : chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              {showTemperature && (
                <YAxis
                  yAxisId="temperature"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={temperatureDomain}
                  label={{ value: '温度 (°C)', angle: -90, position: 'insideLeft' }}
                />
              )}
              {showHumidity && (
                <YAxis
                  yAxisId="humidity"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={humidityDomain}
                  label={{ value: '湿度 (%)', angle: 90, position: 'insideRight' }}
                />
              )}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {showTemperature && (
                <Area
                  yAxisId="temperature"
                  dataKey="temperature"
                  type="natural"
                  fill={temperatureColor}
                  fillOpacity={0.4}
                  stroke={temperatureColor}
                  strokeWidth={2}
                />
              )}
              {showHumidity && (
                <Area
                  yAxisId="humidity"
                  dataKey="humidity"
                  type="natural"
                  fill={humidityColor}
                  fillOpacity={0.2}
                  stroke={humidityColor}
                  strokeWidth={2}
                />
              )}
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[350px] text-muted-foreground">
            温度データがありません
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {latestTemperature !== null && latestHumidity !== null && (
              <div className="flex items-center gap-2 leading-none font-medium">
                現在温度: {latestTemperature}°C ({temperatureTrendText} {temperatureTrendPercentage}%) | 
                現在湿度: {latestHumidity}% ({humidityTrendText} {humidityTrendPercentage}%)
                <TrendingUp className="h-4 w-4" />
              </div>
            )}
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {lastFetch ? (
                `最終更新: ${format(new Date(lastFetch), 'HH:mm:ss')} | 平均温度: ${averageTemperature}°C | 平均湿度: ${averageHumidity}% | データ数: ${data.length}件`
              ) : (
                "データ取得を開始しています..."
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}