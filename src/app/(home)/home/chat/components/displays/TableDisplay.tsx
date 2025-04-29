import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TableDisplayData {
  headers: string[];
  rows: string[][];
  noBorder?: boolean;
}

export const TableDisplay: React.FC<TableDisplayData> = ({
  headers,
  rows,
  noBorder = false,
}) => {
  const tableContent = (
    <ScrollArea className="h-full max-h-[500px]">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className={`${
                  index === 0 ? "font-medium" : ""
                } border border-gray-200 text-gray-700 py-3`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={`py-3 border border-gray-200 ${
                    cellIndex === 0
                      ? "font-medium text-gray-700"
                      : "text-gray-600"
                  } ${
                    typeof cell === "number" || (cell && !isNaN(Number(cell)))
                      ? "text-right"
                      : ""
                  }`}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );

  return noBorder ? (
    <div className="w-full my-2 rounded-lg overflow-hidden shadow-sm">
      {tableContent}
    </div>
  ) : (
    <Card className="border-gray-200 shadow-sm my-2">
      <CardContent className="p-2">{tableContent}</CardContent>
    </Card>
  );
};
