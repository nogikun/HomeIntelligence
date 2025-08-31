import type { Meta, StoryObj } from '@storybook/react'
import { TemperatureChart } from './TemperatureChart'

const meta = {
  title: 'Components/Chart/TemperatureChart',
  component: TemperatureChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    intervalMinutes: {
      control: { type: 'number', min: 0.1, max: 60, step: 0.1 },
      description: 'データ取得間隔（分）',
    },
    temperatureColor: {
      control: { type: 'color' },
      description: '温度グラフの色',
    },
    humidityColor: {
      control: { type: 'color' },
      description: '湿度グラフの色',
    },
    showTemperature: {
      control: { type: 'boolean' },
      description: '温度グラフの表示',
    },
    showHumidity: {
      control: { type: 'boolean' },
      description: '湿度グラフの表示',
    },
  },
} satisfies Meta<typeof TemperatureChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    intervalMinutes: 1,
    temperatureColor: "#ffdc9f",
    humidityColor: "#00b7ff",
    showTemperature: true,
    showHumidity: true,
  },
}

export const LongerInterval: Story = {
  args: {
    intervalMinutes: 5,
    temperatureColor: '#FAA0B0',
    humidityColor: '#73D3FA',
    showTemperature: true,
    showHumidity: true,
  },
  parameters: {
    docs: {
      description: {
        story: '5分間隔で温度データを監視するバージョンです。',
      },
    },
  },
}

export const FastUpdates: Story = {
  args: {
    intervalMinutes: 0.1, // 6秒間隔
    temperatureColor: '#FAA0B0',
    humidityColor: '#73D3FA',
    showTemperature: true,
    showHumidity: true,
  },
  parameters: {
    docs: {
      description: {
        story: '6秒間隔で高速更新するデモ版です。',
      },
    },
  },
}

export const TemperatureOnly: Story = {
  args: {
    intervalMinutes: 1,
    temperatureColor: '#FF6B6B',
    humidityColor: '#4ECDC4',
    showTemperature: true,
    showHumidity: false,
  },
  parameters: {
    docs: {
      description: {
        story: '温度のみを表示するバージョンです。',
      },
    },
  },
}

export const HumidityOnly: Story = {
  args: {
    intervalMinutes: 1,
    temperatureColor: '#FF6B6B',
    humidityColor: '#4ECDC4',
    showTemperature: false,
    showHumidity: true,
  },
  parameters: {
    docs: {
      description: {
        story: '湿度のみを表示するバージョンです。',
      },
    },
  },
}

export const WithCsvExport: Story = {
  args: {
    intervalMinutes: 0.5,
    temperatureColor: '#FF6B6B',
    humidityColor: '#4ECDC4',
    showTemperature: true,
    showHumidity: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'CSV エクスポート機能のテスト用。高速更新でデータを蓄積し、エクスポートボタンをテストできます。',
      },
    },
  },
}