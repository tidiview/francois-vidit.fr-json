const polka = require('polka');

module.exports = polka()
	.get('/:id?', (req, res) => {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
		res.end(`Sub: Howdy from ${req.method} ${req.url}`);
	})
	.put('/:id', (req, res) => {
		res.statusCode = 201; // why not?
		res.end(`Sub: Updated user via ${req.method} ${req.url}`);
	});
