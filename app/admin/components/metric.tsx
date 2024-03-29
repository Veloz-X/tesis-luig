"use client";
import { useTheme } from "next-themes";
import { format } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Signal, WifiOff } from "lucide-react";

const getDataSensor = async (): Promise<Sensor[]> => {
  const sensor = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors?offset=0&limit=50`
  );
  const sensorJson: Sensor[] = await sensor.json();
  return sensorJson;
};

export type Sensor = {
  id: string;
  sensorStatus: boolean;
  temperature: number;
  humidity: number;
  createDate: string;
  updateDate: string;
};

export function CardsMetric() {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "HH:mm");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const [sensor, setSensor] = useState<Sensor[]>([]);
  useEffect(() => {
    getDataSensor().then((sensorData) => setSensor(sensorData));
  }, []);
  const { theme } = useTheme();
  const temperatureLineColor = theme === "light" ? "#ff6600" : "#ff9900"; // Adjust colors based on your preference
  const humidityLineColor = theme === "light" ? "#0088cc" : "#00bfff"; // Adjust colors based on your preference

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfica de Temperatura y Humedad</CardTitle>
        <CardDescription>
          Da click en Actualizar para ver los últimos datos.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sensor}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 20,
              }}
            >
              <XAxis
                className="text-[10px]"
                dataKey="createDate"
                tickFormatter={formatTime}
                label={{ value: 'Tiempo', position: 'insideBottom', offset: -10 }}
              />
              <YAxis className="text-[10px]" label={{ value: 'Temperatura y Humedad', angle: -90, position: 'insideCenter' }}/>
              <CartesianGrid stroke="#eee" strokeDasharray="1 1" />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const connectionStatus = payload.find(
                      (entry) => entry.dataKey === "temperature"
                    )?.payload.sensorStatus;

                    const dateAndTime = payload.find(
                      (entry) => entry.dataKey === "temperature"
                    )?.payload.createDate;

                    const temperature = payload.find(
                      (entry) => entry.dataKey === "temperature"
                    )?.value;

                    const humidity = payload.find(
                      (entry) => entry.dataKey === "humidity"
                    )?.value;

                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col ">
                            <span className="text-[0.70rem] font-semibold uppercase text-muted-foreground text-orange-400">
                              Temperatura
                            </span>
                            <span className="font-bold text-muted-foreground text-orange-400">
                              {temperature} C°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase font-semibold  text-muted-foreground text-cyan-500">
                              Humedad
                            </span>
                            <span className="font-bold text-cyan-500">{humidity} %</span>
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
  );
}
