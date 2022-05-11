const notFound = (req, res) => res.status(404).send('Ups!! Unknown route...')

module.exports = notFound
