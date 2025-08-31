import { forwardRef, HTMLAttributes } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { cn } from '../../lib/utils'

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

export interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  data: Array<{ [key: string]: any }>
  config: ChartConfig
  xAxisKey?: string
  yAxisKey?: string
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
}

const Chart = forwardRef<HTMLDivElement, ChartProps>(
  ({
    data,
    config,
    xAxisKey = 'x',
    yAxisKey = 'y',
    height = 400,
    showGrid = true,
    showTooltip = true,
    className,
    ...props
  }, ref) => {
    const formatXAxisLabel = (value: any) => {
      if (xAxisKey === 'timestamp' || xAxisKey === 'time') {
        try {
          return format(new Date(value), 'HH:mm')
        } catch {
          return value
        }
      }
      return value
    }

    const formatTooltipLabel = (value: any) => {
      if (xAxisKey === 'timestamp' || xAxisKey === 'time') {
        try {
          return format(new Date(value), 'yyyy/MM/dd HH:mm')
        } catch {
          return value
        }
      }
      return value
    }

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{
              top: 12,
              right: 12,
              left: 12,
              bottom: 12,
            }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                vertical={false}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              tickFormatter={formatXAxisLabel}
              className="text-xs"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey={yAxisKey}
              className="text-xs"
              axisLine={false}
              tickLine={false}
            />
            {showTooltip && (
              <Tooltip
                labelFormatter={formatTooltipLabel}
                formatter={(value: any, name: string) => [
                  value,
                  config[name]?.label || name
                ]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
                labelStyle={{
                  color: 'hsl(var(--foreground))',
                }}
              />
            )}
            {Object.entries(config).map(([key, { color }]) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                fill={color}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

Chart.displayName = 'Chart'

export { Chart }