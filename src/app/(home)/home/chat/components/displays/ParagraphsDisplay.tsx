import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface ParagraphsDisplayData {
  paragraphs: string[];
  noBorder?: boolean;
}

export const ParagraphsDisplay: React.FC<ParagraphsDisplayData> = ({
  paragraphs,
  noBorder = false,
}) => {
  const content = (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-[15px] leading-relaxed text-gray-800">
          {paragraph}
        </p>
      ))}
    </div>
  );

  return noBorder ? (
    content
  ) : (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-4">{content}</CardContent>
    </Card>
  );
};
