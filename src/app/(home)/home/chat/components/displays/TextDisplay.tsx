import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface TextDisplayData {
  text: string;
  noBorder?: boolean;
}

export const TextDisplay: React.FC<TextDisplayData> = ({
  text,
  noBorder = false,
}) => {
  return noBorder ? (
    <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
      {text}
    </div>
  ) : (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
          {text}
        </div>
      </CardContent>
    </Card>
  );
};
