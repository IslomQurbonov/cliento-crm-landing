/* ─────────────────────── ContentRenderer ─────────────────────── */

export default function ContentRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-lg leading-relaxed text-foreground/90 mb-6"
              >
                {block.text}
              </p>
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  className="text-2xl md:text-3xl font-bold text-foreground mb-4 mt-10"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={index}
                  className="text-xl md:text-2xl font-semibold text-foreground mb-3 mt-8"
                >
                  {block.text}
                </h3>
              );
            }
            return null;

          case "image":
            return (
              <figure key={index} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  className="w-full rounded-xl"
                  loading="lazy"
                />
                {block.caption && (
                  <figcaption className="text-center text-sm text-muted-foreground mt-3">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-primary/40 pl-6 my-8 italic text-foreground/80 text-lg"
              >
                {block.text}
              </blockquote>
            );

          case "list": {
            const isOrdered = block.ordered;
            const ListTag = isOrdered ? "ol" : "ul";
            const listStyle = isOrdered ? "list-decimal" : "list-disc";
            return (
              <ListTag
                key={index}
                className={`${listStyle} ml-6 space-y-2 mb-6 text-lg text-foreground/90`}
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ListTag>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}
