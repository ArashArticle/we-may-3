import type { HydrogenComponentSchema } from "@weaverse/hydrogen";
import { forwardRef } from "react";
import type { SectionProps } from "~/components/Section";
import { Section, sectionInspector } from "~/components/Section";

type VideoEmbedProps = SectionProps & {
  heading: string;
  description: string;
};

let VideoEmbed = forwardRef<HTMLElement, VideoEmbedProps>((props, ref) => {
  let { children, ...rest } = props;
  return (
    <Section ref={ref} {...rest}>
      {children}
    </Section>
  );
});

export default VideoEmbed;

export let schema: HydrogenComponentSchema = {
  type: "video",
  title: "Video embed",
  toolbar: ["general-settings", ["duplicate", "delete"]],
  inspector: sectionInspector,
  childTypes: ["heading", "paragraph", "video-embed--item"],
  presets: {
    children: [
      {
        type: "heading",
        content: "Video embed",
      },
      {
        type: "paragraph",
        content:
          "A picture is worth a thousand words, and a video is worth even more. Utilize this space to engage, inform, and convince your customers.",
      },
      {
        type: "video-embed--item",
      },
    ],
  },
};
