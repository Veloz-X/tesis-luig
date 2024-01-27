'use client'
import { useTheme } from "next-themes"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip ,XAxis,YAxis} from "recharts"
import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const getDataSensor = async (): Promise<Sensor[]> => {
  const sensor  = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors?offset=0&limit=50`
  );
  const sensorJson: Sensor[] = await sensor.json();
  console.log(sensorJson);
  return sensorJson;
};

export type Sensor = {
  id: string
  sensorStatus: boolean
  temperature: number
  humidity: number
  createDate: string
  updateDate: string
}


export function CardsMetric() {
  const [sensor, setSensor] = useState<Sensor[]>([]);
  useEffect(() => {
    getDataSensor().then((sensorData) => setSensor(sensorData));
  }, []);
  const { theme } = useTheme();
  const temperatureLineColor = theme === 'light' ? '#ff6600' : '#ff9900'; // Adjust colors based on your preference
  const humidityLineColor = theme === 'light' ? '#0088cc' : '#00bfff'; // Adjust colors based on your preference

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafica de Temperatura y Humedad</CardTitle>
        <CardDescription>
        Da click en Actualizar para ver los ultimos datos
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sensor}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name"/>
    <YAxis/>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              
              <Tooltip
  content={({ active, payload }) => {
    if (active && payload && payload.length) {
      console.log('Payload:', payload);
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Temperatura
              </span>
              <span className="font-bold text-muted-foreground">
                {payload[0].value} C°
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Humedad
              </span>
              <span className="font-bold">
                {payload[1].value} %
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }}
/>
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="temperature"
                stroke={temperatureLineColor}
                activeDot={{
                  r: 6,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke={humidityLineColor}
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
