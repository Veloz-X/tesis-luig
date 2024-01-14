'use client'
import { useTheme } from "next-themes"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip ,XAxis,YAxis} from "recharts"

// import { useConfig } from "@/hooks/use-config"

// import { themes } from "@/registry/themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    temperature: 200,
    humidity: 240,
    createDate: "2021-09-01T00:00:00.000Z"
  },
  {
    temperature: 12.22,
    humidity: 139,
    createDate: "2021-09-01T00:00:00.000Z"
  },
  {
    temperature: 200,
    humidity: 500,
    createDate: "2021-09-01T00:00:00.000Z"
  },
  {
    temperature: 278,
    humidity: 390,
    createDate: "2021-09-01T00:00:00.000Z"
  },
  {
    temperature: 189,
    humidity: 480,
    createDate: "2021-09-01T00:00:00.000Z"
  },
  {
    temperature: 239,
    humidity: 380,
    createDate: "2021-09-01T00:00:00.000Z"
  },
  {
    temperature: 349,
    humidity: 430,
    createDate: "2021-09-01T00:00:00.000Z"
  },
]

export function CardsMetric() {
  const { theme: mode } = useTheme()
  // const [config] = useConfig()

  // const theme = themes.find((theme) => theme.name === config.theme)

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
              data={data}
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
                              {payload[1].value} C°
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="temperature"
                activeDot={{
                  r: 6,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                // style={
                //   {
                //     stroke: "var(--theme-primary)",
                //     opacity: 0.25,
                //     "--theme-primary": `hsl(${
                //       theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                //     })`,
                //   } as React.CSSProperties
                // }
              />
              <Line
                type="monotone"
                dataKey="humidity"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                // style={
                //   {
                //     stroke: "var(--theme-primary)",
                //     "--theme-primary": `hsl(${
                //       theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                //     })`,
                //   } as React.CSSProperties
                // }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
