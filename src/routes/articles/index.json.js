import { getArticles } from './_articles.js';

let contents;

export function get(req, res) {
	if (!contents || process.env.NODE_ENV !== 'production') {
		const articles = getArticles().map(article => ({
			title: article.metadata.title,
			slug: article.slug,
			image: article.metadata.image
		}));

		contents = JSON.stringify(articles);
	}

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}
