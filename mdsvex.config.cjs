module.exports = {
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [
    [
      require("remark-github"),
      { repository: "https://github.com/svelte-add/mdsvex.git" },
    ],
    require("remark-abbr"),
  ],
  rehypePlugins: [
    require("rehype-slug"),
    require("rehype-figure"),
    [
      require("rehype-autolink-headings"),
      {
        behavior: "wrap",
      },
    ],
  ],
  layout: {
    articles: "./src/lib/ArticleLayout.svelte",
    projects: "./src/lib/ProjectLayout.svelte",
  },
};
