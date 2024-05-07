import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "./ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "./ui/pagination"
import { Progress } from "./ui/progress"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip"


export default function RecordList() {

    const data = [
        {
          id: 1234,
          name: 'Maintenance',
          location: 'Wright-Patterson AFB',
          code: 5678,
          category: 'Noise',
          number: 9101,
          type: 'Bearing'
        },
        {
          id: 1122,
          name: 'Repair',
          location: 'Edwards AFB',
          code: 3344,
          category: 'Vibration',
          number: 5566,
          type: 'Engine'
        },
        {
          id: 7788,
          name: 'Inspection',
          location: 'Nellis AFB',
          code: 9910,
          category: 'Leak',
          number: 1121,
          type: 'Hydraulics'
        },
        {
          id: 2233,
          name: 'Overhaul',
          location: 'Andrews AFB',
          code: 4455,
          category: 'Wear',
          number: 6677,
          type: 'Landing Gear'
        },
        {
            id: 3456,
            name: 'Check',
            location: 'Dover AFB',
            code: 7890,
            category: 'Temperature',
            number: 2345,
            type: 'Cooling System'
          },
          {
            id: 4567,
            name: 'Replacement',
            location: 'McChord AFB',
            code: 8901,
            category: 'Pressure',
            number: 3456,
            type: 'Fuel System'
          },
          {
            id: 5678,
            name: 'Adjustment',
            location: 'Ramstein AFB',
            code: 9012,
            category: 'Alignment',
            number: 4567,
            type: 'Flight Controls'
          },
          {
            id: 6789,
            name: 'Cleaning',
            location: 'Kadena AFB',
            code: 1234,
            category: 'Contamination',
            number: 5678,
            type: 'Air Intake'
          },
          {
            id: 7890,
            name: 'Testing',
            location: 'Misawa AFB',
            code: 2345,
            category: 'Functionality',
            number: 6789,
            type: 'Electrical Systems'
          }
      ];

        return (
            
            <div className="xl:col-span-2">
           
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Maintenance Records</CardTitle>
                    <CardDescription>
                      Maintenance record list of in-flight assignments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Control No.</TableHead>
                          <TableHead className="hidden sm:table-cell">Workcenter</TableHead>
                          <TableHead className="hidden sm:table-cell">I.D. No./Serial No.</TableHead>
                          <TableHead className="hidden md:table-cell">Discrepancy</TableHead>
                          <TableHead className="hidden md:table-cell">Eng Time</TableHead>
                          <TableHead className="text-right">Parts Replaced</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      
                        {data.map((item, index) => (
                        <TableRow key={index} className="">
                            <TableCell>
                            <div className="font-medium">{item.id}</div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                            {item.name}
                            <div className="hidden text-sm text-muted-foreground md:block">
                                {item.location}
                            </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                            {item.code}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                                {item.category}
                            </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                            {item.number}
                            </TableCell>
                            <TableCell className="text-right">{item.type}</TableCell>
                        </TableRow>
                        ))}
                    
                       
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          
        </div>
            
        );
    }
