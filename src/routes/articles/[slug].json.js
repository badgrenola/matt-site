import { getArticle } from '../../articles/helpers';

export function get({ params }) {
  const { slug } = params;
  const body = JSON.stringify(getArticle(slug, true));
  return { body }
}