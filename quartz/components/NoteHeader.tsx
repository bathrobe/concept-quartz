import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/noteHeader.scss"

function NoteHeader({ fileData }: QuartzComponentProps) {
  const { frontmatter } = fileData

  if (!frontmatter?.sourceQuote) return null

  return (
    <div class="note-header">
      <blockquote class="source-quote">
        {frontmatter.sourceQuote}
        {frontmatter.sourceAttribution && (
          <footer>
            — <cite>{frontmatter.sourceAttribution.replace(/\[\[(.*?)\]\]/g, "$1")}</cite>
          </footer>
        )}
      </blockquote>
    </div>
  )
}

NoteHeader.css = style
export default (() => NoteHeader) satisfies QuartzComponentConstructor
