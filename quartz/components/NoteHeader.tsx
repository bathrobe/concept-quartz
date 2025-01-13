import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Fragment } from "preact"
import style from "./styles/noteHeader.scss"
import { resolveRelative, simplifySlug } from "../util/path"

function NoteHeader({ fileData, ctx }: QuartzComponentProps) {
  const { frontmatter, slug } = fileData

  if (!frontmatter?.sourceQuote) return null

  // Parse the wikilink to get both path and display text
  const sourceWikilink = frontmatter.sourceLink?.match(/\[\[(.*?)(?:\|(.*?))?\]\]/)
  let sourcePath, sourceDisplay
  if (sourceWikilink) {
    sourcePath = sourceWikilink[1]?.split("|")[0]
    // Remove Concept/Website/ or CONCEPT/Website/ prefix if it exists (case insensitive)
    sourcePath = sourcePath?.replace(/^(?:CONCEPT|Concept)\/Website\//i, "")
    sourceDisplay = sourceWikilink[2] || sourcePath?.split("/").pop() || sourcePath
    // Remove any file extensions
    sourcePath = sourcePath?.replace(/\.(md|mdx)$/, "")
    // Ensure Sources/ prefix exists
    if (!sourcePath.startsWith("Sources/")) {
      sourcePath = `Sources/${sourcePath}`
    }
    // Convert spaces and special characters to dashes
    sourcePath = sourcePath.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9/-]/g, "-")
  }

  return (
    <div class="note-header">
      {sourcePath && (
        <div class="source-reference">
          From{" "}
          <a href={resolveRelative(slug, sourcePath)} class="source-title">
            {sourceDisplay}
          </a>
        </div>
      )}
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
