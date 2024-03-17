// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import RecentNotesConstructor from "./RecentNotes"

const Body: QuartzComponent = ({children, ...componentData}: QuartzComponentProps) => {
  const RecentNotes = RecentNotesConstructor()
  return (
    <div id="quartz-body">
      {children}
      <RecentNotes {...componentData} />
    </div>
  )
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => {
  return Body
}) satisfies QuartzComponentConstructor
