"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
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


import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data: Payment[] = [
  {
    sensorStatus: true,
    temperature: 25.36,
    humidity: 32.42,
    id: "20fa4b39-34aa-4649-8d0b-4b4e6a656c08",
    createDate: "2024-01-13T19:11:52.363Z",
    updateDate: "2024-01-13T19:11:52.363Z"
  },
  {
    sensorStatus: false,
    temperature: 25.36,
    humidity: 32.42,
    id: "20fa4b39-34aa-4649-8d0b-4b4e6a656c08",
    createDate: "2024-01-13T19:11:52.363Z",
    updateDate: "2024-01-13T19:11:52.363Z"
  },
  {
    sensorStatus: true,
    temperature: 25.36,
    humidity: 32.42,
    id: "20fa4b39-34aa-4649-8d0b-4b4e6a656c08",
    createDate: "2024-01-13T19:11:52.363Z",
    updateDate: "2024-01-13T19:11:52.363Z"
  },
  {
    sensorStatus: false,
    temperature: 25.36,
    humidity: 32.42,
    id: "20fa4b39-34aa-4649-8d0b-4b4e6a656c08",
    createDate: "2024-01-13T19:11:52.363Z",
    updateDate: "2024-01-13T19:11:52.363Z"
  },
  {
    sensorStatus: true,
    temperature: 25.36,
    humidity: 32.42,
    id: "20fa4b39-34aa-4649-8d0b-4b4e6a656c08",
    createDate: "2024-01-13T19:11:52.363Z",
    updateDate: "2024-01-13T19:11:52.363Z"
  },
]

export type Payment = {
  id: string
  sensorStatus: boolean
  temperature: number
  humidity: number
  createDate: string
  updateDate: string
}

export const columns: ColumnDef<Payment>[] = [


  {
    accessorKey: "humidity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Humedad
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("humidity")}</div>,
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Temperatura
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("temperature")}</div>,
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("createDate")}</div>,
  },
  {
    accessorKey: "sensorStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("sensorStatus")==true?'Conetado':'Desconectado'}</div>,
  },
]

export function CardsDataTableSensor() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del Sensor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
