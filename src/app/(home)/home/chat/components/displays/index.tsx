import { TextDisplay, TextDisplayData } from "./TextDisplay";
import { ParagraphsDisplay, ParagraphsDisplayData } from "./ParagraphsDisplay";
import { ListDisplay, ListDisplayData } from "./ListDisplay";
import {
  SingleCardDisplay,
  CardsDisplay,
  CardDisplayData,
  CardsDisplayData,
} from "./CardDisplay";
import { BarChartDisplay, BarChartDisplayData } from "./BarChartDisplay";
import { LineChartDisplay, LineChartDisplayData } from "./LineChartDisplay";
import { PieChartDisplay, PieChartDisplayData } from "./PieChartDisplay";
import { TableDisplay, TableDisplayData } from "./TableDisplay";

export {
  TextDisplay,
  ParagraphsDisplay,
  ListDisplay,
  SingleCardDisplay,
  CardsDisplay,
  BarChartDisplay,
  LineChartDisplay,
  PieChartDisplay,
  TableDisplay,
};

export type {
  TextDisplayData,
  ParagraphsDisplayData,
  ListDisplayData,
  CardDisplayData,
  CardsDisplayData,
  BarChartDisplayData,
  LineChartDisplayData,
  PieChartDisplayData,
  TableDisplayData,
};

export interface DataPoint {
  name: string;
  value: number;
}

// Define the outer response format that includes display type
export interface DisplayResponse {
  type:
    | "text"
    | "paragraphs"
    | "list"
    | "cards"
    | "barChart"
    | "lineChart"
    | "pieChart"
    | "table";
  data:
    | TextDisplayData
    | ParagraphsDisplayData
    | ListDisplayData
    | CardsDisplayData
    | BarChartDisplayData
    | LineChartDisplayData
    | PieChartDisplayData
    | TableDisplayData;
}

// Main component that selects and renders the appropriate display type
export const DynamicDisplay: React.FC<DisplayResponse> = ({ type, data }) => {
  switch (type) {
    case "text":
      return <TextDisplay {...(data as TextDisplayData)} />;
    case "paragraphs":
      return <ParagraphsDisplay {...(data as ParagraphsDisplayData)} />;
    case "list":
      return <ListDisplay {...(data as ListDisplayData)} />;
    case "cards":
      return <CardsDisplay {...(data as CardsDisplayData)} />;
    case "barChart":
      return <BarChartDisplay {...(data as BarChartDisplayData)} />;
    case "lineChart":
      return <LineChartDisplay {...(data as LineChartDisplayData)} />;
    case "pieChart":
      return <PieChartDisplay {...(data as PieChartDisplayData)} />;
    case "table":
      return <TableDisplay {...(data as TableDisplayData)} />;
    default:
      return <div>Unsupported display type</div>;
  }
};
