const polka = require('polka');

module.exports = polka()
	.get('/:id?', (req, res) => {
		res.writeHead(200, { 'Content-Type': 'application/json', 'x-content-type-options': 'nosniff', 'cache-control': 'no-cache', 'content-type': 'utf-8' });
		res.end(`Sub: Howdy from ${req.method} ${req.url}`);
	})
	.put('/:id', (req, res) => {
		res.statusCode = 201; // why not?
		res.end(`Sub: Updated user via ${req.method} ${req.url}`);
	});
