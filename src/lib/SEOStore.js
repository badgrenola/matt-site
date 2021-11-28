import { writable } from "svelte/store";

const SEO_Defaults = {
  title: "Matt Brealey",
  description: "The portfolio site of a freelance creative problem solver.",
  keywords: "space, react, reactjs, threejs, sapper, svelte, sveltejs, ios, swift, 3d, ar, vfx, design",
  openGraph: {
    type: "website",
    url: "https://mattbrealey.com",
    title: "Matt Brealey",
    description: "The portfolio site of a freelance creative problem solver.",
    image: "https://mattbrealey.com/profile.jpg",
  },
  twitter: {
    card: "summary_large_image",
    url: "https://mattbrealey.com",
    title: "Matt Brealey",
    description: "The portfolio site of a freelance creative problem solver.",
    image: "https://mattbrealey.com/profile.jpg",
  }
  }

const createSEOStore = () => {
  const {set, update, subscribe} = writable(Object.assign({}, SEO_Defaults))

  const setToIndex = () => {
    set(Object.assign({}, SEO_Defaults))
  }

  const setToArticle = (props) => setToItem(props, true)
  const setToProject = (props) => setToItem(props)

  const setToItem = ({title, desc, keywords, slug, smallImage}, isArticle=false) => {
    update(state => {
      state.title = `${title} // Matt Brealey`
      state.description = desc
      state.keywords = keywords || SEO_Defaults.keywords

      state.openGraph.url = `https://mattbrealey.com/${isArticle ? "articles" : "projects"}/${slug}`
      state.openGraph.title = title
      state.openGraph.description = desc
      state.openGraph.image = smallImage

      state.twitter.url = `https://mattbrealey.com/${isArticle ? "articles" : "projects"}/${slug}`
      state.twitter.title = title
      state.twitter.description = desc
      state.twitter.image = smallImage
      return state
    })
  }

  return { 
    subscribe,
    setToIndex,
    setToArticle,
    setToProject
  }
}

//Default to the main site meta
const SEOStore = createSEOStore()
export { SEOStore, SEO_Defaults }