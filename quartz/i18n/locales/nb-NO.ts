import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Ikke navngitt",
    description: "Mangler beskrivelse",
  },
  components: {
    callout: {
      note: "Note",
      abstract: "Abstract",
      info: "Info",
      todo: "Todo",
      tip: "Tip",
      success: "Success",
      question: "Question",
      warning: "Warning",
      failure: "Failure",
      danger: "Danger",
      bug: "Bug",
      example: "Example",
      quote: "Quote",
    },
    backlinks: {
      title: "Andre notater som linker tilbake hit",
      noBacklinksFound: "Fant ingen notater som linker tilbake",
    },
    themeToggle: {
      lightMode: "Lyse omgivelser",
      darkMode: "Mørke omgivelser",
    },
    explorer: {
      title: "Alle notater",
    },
    footer: {
      createdWith: "Lagd med",
    },
    graph: {
      title: "Notatkart",
    },
    recentNotes: {
      title: "Nylig oppdaterte notater",
      seeRemainingMore: ({ remaining }) => `Se ${remaining} til →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Utdrag av ${targetSlug}`,
      linkToOriginal: "Link til det originale notatet",
    },
    search: {
      title: "Søk",
      searchBarPlaceholder: "Søk etter noe",
    },
    tableOfContents: {
      title: "Hva du finner i notatet",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} minutter å lese`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Nylig oppdaterte notater",
      lastFewNotes: ({ count }) => `Siste ${count} notater`,
    },
    error: {
      title: "Fant ingenting",
      notFound: "Beklager, nå har jeg sendt deg på en blindvei.",
    },
    folderContent: {
      folder: "Mappe",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "Ett notat i denne mappa" : `${count} notater i denne mappa.`,
    },
    tagContent: {
      tag: "Emneknagg",
      tagIndex: "Oversikt over emneknagger",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "Ett notat med denne emneknaggen" : `${count} notater med denne emneknaggen.`,
      showingFirst: ({ count }) => `Viser første ${count} emneknagger.`,
      totalTags: ({ count }) => `Fant ${count} emneknagger totalt.`,
    },
  },
} as const satisfies Translation
