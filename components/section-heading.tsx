import { Reveal } from "@/components/reveal"

export function SectionHeading({
  korean,
  title,
  description,
  align = "center",
}: {
  korean: string
  title: string
  description?: string
  align?: "center" | "left"
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <span className="font-serif text-sm font-semibold tracking-wide text-accent">
        {korean}
      </span>
      <h2 className="mt-2 text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
