import {
  type HydrogenComponentProps,
  type InspectorGroup,
} from "@weaverse/hydrogen";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import React, { forwardRef } from "react";
import { cn } from "~/lib/cn";
import type { BackgroundImageProps } from "./BackgroundImage";
import { BackgroundImage, backgroundInputs } from "./BackgroundImage";
import type { OverlayProps } from "./Overlay";
import { Overlay, overlayInputs } from "./Overlay";

export type BackgroundProps = BackgroundImageProps & {
  backgroundFor: "section" | "content";
  backgroundColor: string;
};

export interface SectionProps
  extends Omit<VariantProps<typeof variants>, "padding">,
    HydrogenComponentProps,
    Omit<HTMLAttributes<HTMLElement>, "children">,
    BackgroundProps,
    OverlayProps {
  as: React.ElementType;
  borderRadius: number;
  containerClassName: string;
}

let variants = cva("relative overflow-hidden", {
  variants: {
    width: {
      full: "w-full h-full",
      stretch: "w-full h-full",
      fixed: "w-full h-full max-w-[var(--page-width,1280px)] mx-auto",
    },
    padding: {
      full: "",
      stretch: "px-3 md:px-10 lg:px-16",
      fixed: "px-3 md:px-4 lg:px-6 mx-auto",
    },
    verticalPadding: {
      none: "",
      small: "py-4 md:py-6 lg:py-8",
      medium: "py-8 md:py-12 lg:py-16",
      large: "py-12 md:py-24 lg:py-32",
    },
    gap: {
      0: "",
      4: "space-y-1",
      8: "space-y-2",
      12: "space-y-3",
      16: "space-y-4",
      20: "space-y-5",
      24: "space-y-3 lg:space-y-6",
      28: "space-y-3.5 lg:space-y-7",
      32: "space-y-4 lg:space-y-8",
      36: "space-y-4 lg:space-y-9",
      40: "space-y-5 lg:space-y-10",
      44: "space-y-5 lg:space-y-11",
      48: "space-y-6 lg:space-y-12",
      52: "space-y-6 lg:space-y-[52px]",
      56: "space-y-7 lg:space-y-14",
      60: "space-y-7 lg:space-y-[60px]",
    },
  },
});

export let Section = forwardRef<HTMLElement, SectionProps>((props, ref) => {
  let {
    as: Component = "section",
    width,
    gap,
    verticalPadding,
    borderRadius,
    backgroundColor,
    backgroundFor,
    backgroundImage,
    backgroundFit,
    backgroundPosition,
    enableOverlay,
    overlayColor,
    overlayOpacity,
    className,
    children,
    containerClassName,
    style = {},
    ...rest
  } = props;

  style = {
    ...style,
    "--section-background-color": backgroundColor,
    "--section-border-radius": `${borderRadius}px`,
  } as React.CSSProperties;

  let isBgForContent = backgroundFor === "content";
  let hasBackground = backgroundColor || backgroundImage || borderRadius > 0;

  return (
    <Component
      ref={ref}
      {...rest}
      style={style}
      className={cn(
        variants({ padding: width, className }),
        hasBackground && !isBgForContent && "has-background",
      )}
    >
      {!isBgForContent && <OverlayAndBackground {...props} />}
      <div
        className={cn(
          variants({ gap, width, verticalPadding }),
          containerClassName,
          hasBackground && isBgForContent && "has-background px-2 sm:px-4",
        )}
      >
        {isBgForContent && <OverlayAndBackground {...props} />}
        {children}
      </div>
    </Component>
  );
});

function OverlayAndBackground(props: SectionProps) {
  let {
    backgroundImage,
    backgroundFit,
    backgroundPosition,
    enableOverlay,
    overlayColor,
    overlayOpacity,
  } = props;
  return (
    <>
      <BackgroundImage
        backgroundImage={backgroundImage}
        backgroundFit={backgroundFit}
        backgroundPosition={backgroundPosition}
      />
      <Overlay
        enableOverlay={enableOverlay}
        overlayColor={overlayColor}
        overlayOpacity={overlayOpacity}
      />
    </>
  );
}

export let layoutInputs: InspectorGroup["inputs"] = [
  {
    type: "select",
    name: "width",
    label: "Content width",
    configs: {
      options: [
        { value: "full", label: "Full page" },
        { value: "stretch", label: "Stretch" },
        { value: "fixed", label: "Fixed" },
      ],
    },
    defaultValue: "fixed",
  },
  {
    type: "range",
    name: "gap",
    label: "Items spacing",
    configs: {
      min: 0,
      max: 60,
      step: 4,
      unit: "px",
    },
    defaultValue: 20,
  },
  {
    type: "select",
    name: "verticalPadding",
    label: "Vertical padding",
    configs: {
      options: [
        { value: "none", label: "None" },
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
      ],
    },
    defaultValue: "medium",
  },
  {
    type: "range",
    name: "borderRadius",
    label: "Corner radius",
    configs: {
      min: 0,
      max: 40,
      step: 2,
      unit: "px",
    },
    defaultValue: 0,
  },
];

export let sectionInspector: InspectorGroup[] = [
  { group: "Layout", inputs: layoutInputs },
  { group: "Background", inputs: backgroundInputs },
  { group: "Overlay", inputs: overlayInputs },
];
