"use client";

import React from "react";
import { AssistantSection } from "@/src/types/assistant";

interface AssistantDetailContentProps {
  /** The section with heading index=0 is treated as the main section title. */
  sections: AssistantSection[];
  mode: "example" | "structure";
}

/**
 * Pure presentational component.
 * Renders assistant template sections in either "example" or "structure" mode.
 * Reusable for both Personal assistant detail and Shared assistant detail pages.
 */
export const AssistantDetailContent = ({
  sections,
  mode,
}: AssistantDetailContentProps) => {
  return (
    <div className="space-y-6 text-foreground/90 text-[15px] leading-relaxed">
      {sections.map((section, index) => {
        const text =
          mode === "example" ? section.exampleText : section.structureText;

        // First section is the main heading (no body text needed)
        if (index === 0) {
          return (
            <div key={index}>
              <h3 className="font-semibold text-foreground text-base">
                {section.heading}
              </h3>
            </div>
          );
        }

        // Single-line fields (Patient, Referring Clinician, etc.)
        const isSingleLine =
          !text.includes("\n") &&
          text.length < 200 &&
          !section.heading.endsWith(":");

        return (
          <div key={index}>
            {/* Inline label + text for short fields */}
            {isSingleLine ? (
              <p>
                <span className="font-semibold text-foreground">
                  {section.heading}
                </span>{" "}
                {mode === "example" ? (
                  text
                ) : (
                  <span className="text-muted-foreground">{text}</span>
                )}
              </p>
            ) : (
              /* Block label + paragraph for longer fields */
              <>
                <p className="font-semibold text-foreground mb-1">
                  {section.heading}
                </p>
                <p
                  className={
                    mode === "structure" ? "text-muted-foreground" : ""
                  }
                >
                  {text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
