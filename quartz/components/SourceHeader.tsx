import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Fragment } from "preact"
import style from "./styles/sourceHeader.scss"

function SourceHeader({ fileData }: QuartzComponentProps) {
  const { frontmatter } = fileData

  if (!frontmatter?.source) return null

  // Convert wikilinks in author names to plain text
  const authors = frontmatter.author?.map((author) => author.replace(/\[\[(.*?)\]\]/g, "$1"))

  return (
    <div class="source-header">
      <div class="source-meta">
        {frontmatter.source && (
          <a href={frontmatter.source} class="source-link" target="_blank" rel="noopener">
            Original Source ↗
          </a>
        )}
        {authors && authors.length > 0 && <div class="authors">Authors: {authors.join(", ")}</div>}
        {frontmatter.published && (
          <div class="published-date">Published: {frontmatter.published}</div>
        )}
      </div>
    </div>
  )
}

SourceHeader.css = style
export default (() => SourceHeader) satisfies QuartzComponentConstructor
