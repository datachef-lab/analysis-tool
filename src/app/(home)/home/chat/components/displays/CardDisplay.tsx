import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface CardDisplayData {
  title: string;
  content: string;
  footer?: string;
  noBorder?: boolean;
}

export interface CardsDisplayData {
  cards: CardDisplayData[];
  noBorder?: boolean;
}

// Process content to handle markdown-style formatting
const processContent = (text: string) => {
  // Handle bold text formatting (markdown style **)
  const boldFormatted = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Replace newlines with line breaks
  return boldFormatted.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      <span dangerouslySetInnerHTML={{ __html: line }} />
    </React.Fragment>
  ));
};

export const SingleCardDisplay: React.FC<CardDisplayData> = ({
  title,
  content,
  footer,
  noBorder = false,
}) => {
  return noBorder ? (
    <div className="mb-2 overflow-hidden">
      <div className="p-0">
        <div className="pb-3 mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="space-y-3">
          <div className="text-[15px] leading-relaxed text-gray-700">
            {processContent(content)}
          </div>
          {footer && (
            <div className="text-sm text-gray-500 mt-3 pt-3">{footer}</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Card className="mb-2 overflow-hidden border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <div className="text-[15px] leading-relaxed text-gray-700">
          {processContent(content)}
        </div>
      </CardContent>
      {footer && (
        <>
          <Separator className="mx-4" />
          <CardFooter className="text-sm text-gray-500 pt-2">
            {footer}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export const CardsDisplay: React.FC<CardsDisplayData> = ({
  cards,
  noBorder = false,
}) => {
  return (
    <div className="space-y-4 w-full">
      {cards.map((card, index) => (
        <SingleCardDisplay key={index} {...card} noBorder={noBorder} />
      ))}
    </div>
  );
};
