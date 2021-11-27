import { writable } from "svelte/store";

export const seo = writable({
  title: "Matt Brealey",
  description: "some description",
});
