"use client"

import { useEffect, useRef, useState } from "react"

export function SkillBar({
  name,
  korean,
  level,
}: {
  name: string
  korean: string
  level: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(level)
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [level])

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-medium text-foreground">
          {name}{" "}
          <span className="font-serif text-sm text-muted-foreground">· {korean}</span>
        </span>
        <span className="text-sm font-semibold text-accent">{level}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
