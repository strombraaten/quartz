import React from 'react'
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { WebsiteCarbonBadge } from 'react-websitecarbon-badge'

interface Options {
  links: Record<string, string>
}

const CarbonBadge: React.FC = () => {
  return <WebsiteCarbonBadge co2="0.08" percentage="92" lang="en" />
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const links = opts?.links ?? []

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://obsidian.md">Obsidian</a> og <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        <CarbonBadge />
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
