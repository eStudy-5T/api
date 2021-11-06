/* eslint-disable object-curly-spacing */
const configHeader = (req, res, next) => {
  res.setHeader('Last-Modified', new Date().toUTCString())
  next()
}

export { configHeader }
