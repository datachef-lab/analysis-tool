import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface ListDisplayData {
  items: string[];
  ordered?: boolean;
  noBorder?: boolean;
}

export const ListDisplay: React.FC<ListDisplayData> = ({
  items,
  ordered = false,
  noBorder = false,
}) => {
  const content = ordered ? (
    <ol className="list-decimal list-inside space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="text-[15px] leading-relaxed text-gray-800">
          {item}
        </li>
      ))}
    </ol>
  ) : (
    <ul className="list-disc list-inside space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="text-[15px] leading-relaxed text-gray-800">
          {item}
        </li>
      ))}
    </ul>
  );

  return noBorder ? (
    <div className="p-4 bg-white my-2">{content}</div>
  ) : (
    <Card className="border-gray-200 shadow-sm my-2">
      <CardContent className="p-4">{content}</CardContent>
    </Card>
  );
};
