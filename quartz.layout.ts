import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Backlinks(),
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
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    // Desktop layout (unchanged)
    Component.PageTitle(),
    Component.DesktopOnly(
      Component.Flex({
        components: [
          {
            Component: Component.Search(),
            grow: true,
          },
          { Component: Component.Darkmode() },
        ],
        direction: "row",
        gap: "1rem",
      })
    ),
    Component.DesktopOnly(Component.Explorer()),
    
    // Mobile layout: Column with PageTitle, Explorer, and then Search+Darkmode row
    Component.MobileOnly(
      Component.Flex({
        direction: "column",  // Vertical arrangement (column)
        gap: "1rem",          // Space between items
        components: [
          {
            // First item: PageTitle and Explorer, side-by-side
            Component: Component.Flex({
              direction: "row",     // Horizontal arrangement
              gap: "0.75rem",       // Space between PageTitle and Explorer
              components: [
                {
                  Component: Component.PageTitle(),
                },
                {
                  Component: Component.Explorer(),
                }
              ]
            }),
          },
          {
            // Second item: Row with Search and Darkmode
            Component: Component.Flex({
              direction: "row",     // Horizontal arrangement
              gap: "0.75rem",       // Space between Search and Darkmode
              components: [
                {
                  Component: Component.Search(),
                  grow: true,       // Search expands to fill width
                },
                {
                  Component: Component.Darkmode(),
                  grow: false,      // Darkmode uses only needed space
                }
              ]
            }),
          }
        ]
      })
    )
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
