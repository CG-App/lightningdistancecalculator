"use client"
import { useMDXComponent } from "next-contentlayer/hooks"

type Props = { code: string }

// If you want to expose custom components globally to MDX, map them here.
// Example in the future:
// import LightningCalculator from "@/components/LightningCalculator"
// const components = { LightningCalculator }

export default function MdxContent({ code }: Props) {
  const Component = useMDXComponent(code)
  return <Component /* components={components} */ />
}
