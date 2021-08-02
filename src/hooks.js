import { projects } from './projects/_projects'
import { getArticleCards } from './articles/helpers'

export function getSession() {
	return {
    articles: getArticleCards(),
    projects
  }
}