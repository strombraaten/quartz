import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  return (
    <article class="popover-hint">
      <h1>Blindvei! 😬</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <p>Bli med tilbake <a href="https://www.simenskriver.no/">til forsida</a>, eller <a href="mailto:strombraaten@gmail.com?subject=Blindvei&body=Hei%2C%20Simen%21%20Jeg%20ville%20bare%20si%20i%20fra%20at%20jeg%20havna%20p%C3%A5%20en%20blindvei%20etter%20jeg%20trykka%20p%C3%A5%20linken%20til%20%28spesifiser%20hvilken%20side%20du%20skulle%20til%29.%20Kan%20du%20fikse%20det%2C%20er%20du%20grei%3F">si i fra hvordan du havna her</a>, så jeg kan fikse det til seinere.</p>
      <p>Når du trykker på linken blir du sendt til epost-appen din, hvor jeg har fylt ut en epost på forhånd, så alt du trenger å gjøre er å spesifisere hvor du kom fra.</p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
