import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Backlinks(),
    Component.Graph(),
    Component.RecentNotes(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/strombraaten/quartz",
      "Discord-gjengen": "https://discord.gg/f2ZrnPVbYC",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.DesktopOnly(Component.PageTitle()),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    // Desktop only components
    Component.DesktopOnly(
      Component.Search(),
      Component.Explorer()),
    
    // Mobile layout with nested flex components
    Component.MobileOnly(
      Component.Flex({
        direction: "column",
        gap: "1rem",
        components: [
          // First row flex container
          {
            Component: Component.Flex({
              direction: "row",
              gap: "1rem",
              components: [
                { Component: Component.Explorer() },
                { Component: Component.MobileOnly(Component.Spacer()) },
                { Component: Component.PageTitle(), grow: true }
              ],
            })
          },
          // Second row flex container
          {
            Component: Component.Flex({
              direction: "row",
              gap: "1rem",
              components: [
                { Component: Component.Search(), grow: true },
                { Component: Component.Darkmode() }
              ],
            })
          }
        ],
      })
    ),
  ],
  right: [
    Component.DesktopOnly(
      Component.Darkmode(),
      Component.TableOfContents()),
  ],
  afterBody: [
    Component.Backlinks(),
    Component.RecentNotes(),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
