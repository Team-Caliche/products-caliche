import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/calicheClean', { useUnifiedTopology: true, useNewUrlParser: true }).catch(err => console.log('err on connect', err))

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('successfully opened connection to mongoDB')

  const productSchema = new mongoose.Schema({}, {
    collection: 'products'
  })
  const styleSchema = new mongoose.Schema({}, {
    collection: 'styles'
  })
  const skuSchema = new mongoose.Schema({}, {
    collection: 'skus'
  })

  //indexes used in API queries
  skuSchema.index({id: 1})
  styleSchema.index({productId: 1})
  productSchema.index({id: 1})

  const Product = mongoose.model('Product', productSchema)
  const Style = mongoose.model('Style', styleSchema)
  const Sku = mongoose.model('Sku', skuSchema)
})

export default db
