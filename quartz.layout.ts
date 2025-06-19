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
    // PageTitle at the top (for both mobile and desktop)
    Component.PageTitle(),
    
    // For desktop: Search and Darkmode below PageTitle
    Component.DesktopOnly(
      Component.Flex({
        components: [
          {
            Component: Component.Search(),
            grow: true,       // Search will expand to fill available space
            align: "center",  // Center vertically
          },
          { 
            Component: Component.Darkmode(),
            grow: false,      // Keep natural size
            align: "center",  // Center vertically
          },
        ],
        direction: "row",     // Arrange components horizontally
        gap: "1rem",          // Space between components
      })
    ),
    
    // Explorer (for both mobile and desktop)
    Component.Explorer(),
    
    // For mobile only: Search and Darkmode below Explorer
    Component.MobileOnly(
      Component.Flex({
        components: [
          {
            Component: Component.Search(),
            grow: true,       // Search will expand to fill available space
            shrink: true,     // Allow shrinking if needed
            basis: "0",       // Start with minimum size and grow from there
            align: "center",  // Center vertically
            justify: "start", // Align to start of main axis
          },
          { 
            Component: Component.Darkmode(),
            grow: false,      // Don't expand beyond natural size
            shrink: false,    // Don't shrink below natural size
            align: "center",  // Center vertically
            justify: "end",   // Align to end of main axis
          },
        ],
        direction: "row",     // Arrange components horizontally
        wrap: "nowrap",       // Don't wrap to next line
        gap: "0.75rem",       // Space between components
      })
    ),
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
