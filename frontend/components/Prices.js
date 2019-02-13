import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import priceFormatter from '../lib/priceFormatter'

const PRICE_QUERY = gql`
  query PRICE_QUERY($isbn: String!) {
    findPrice(isbn10: $isbn) {
      marketplace
      MSRP
      offerPrice
      currency
      affiliateLink
    }
  }
`
class Prices extends React.Component {
  render() {
    const { isbn } = this.props
    return (
      <Query query={PRICE_QUERY} variables={{ isbn }}>
        {({ data, loading, error }) => {
          if (loading || error) return null
          const priceData = data.findPrice
          const prices = priceFormatter(priceData)
          return (
            <div>
              <strong>Price</strong>
              {prices.map((price, i) => (
                <p key={price.marketplace}>
                  {price.marketplace}:{' '}
                  <a href={price.affiliateLink}>
                    {priceData[i].MSRP > priceData[i].offerPrice ? (
                      <>
                        <strike>{price.formattedMSRP}</strike>{' '}
                        {price.formattedOffer}
                      </>
                    ) : (
                      price.formattedMSRP
                    )}
                  </a>
                </p>
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Prices
