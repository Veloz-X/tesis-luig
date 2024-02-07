"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Signal, WifiOff } from "lucide-react"

const getDataSensor = async (): Promise<Sensor[]> => {
  const sensor  = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors?offset=0&limit=10`
  );
  const sensorJson: Sensor[] = await sensor.json();
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


export const columns: ColumnDef<Sensor>[] = [

  {
    accessorKey: "humidity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Humedad
        </Button>
      )
    },
    cell: ({ row }) => <div className=" text-center">{row.getValue("humidity")} %</div>,
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Temperatura
        </Button>
      )
    },
    cell: ({ row }) => <div className=" text-center">{row.getValue("temperature")} °C</div>,
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Fecha
        </Button>
      );
    },
    cell: ({ row }) => {
      const utcDate = new Date(row.getValue("createDate"));
      const ecuadorDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "America/Guayaquil" }));
      const formattedDate = ecuadorDate.toLocaleString("es-EC", { dateStyle: "full", timeStyle: "short" });
      return <div className="lowercase text-[10px] ">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "sensorStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Estado del Sensor
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">
      {row.getValue("sensorStatus")==true?
      <Badge><Signal className="w-4 mr-2" />Conectado</Badge>
      :<Badge variant="destructive"><WifiOff className="w-4 mr-2" />Apagado</Badge>
      }
      </div>,
  },
]



export function CardsDataTableSensor() {
  const [sensor, setSensor] = useState<Sensor[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: sensor,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  useEffect(() => {
    getDataSensor().then((sensorData) => setSensor(sensorData));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del Sensor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionada.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Antes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
