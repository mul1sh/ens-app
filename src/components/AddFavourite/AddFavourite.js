import React, { Component } from 'react'
import styled from 'react-emotion'
import InActiveHeartDefault from '../Icons/InActiveHeart'
import ActiveHeartDefault from '../Icons/ActiveHeart'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ActiveHeart = styled(ActiveHeartDefault)`
  margin-right: 20px;

  &:hover {
    cursor: pointer;
  }
`

const InActiveHeart = styled(InActiveHeartDefault)`
  margin-right: 20px;

  &:hover {
    cursor: pointer;
  }
`

const ADD_FAVOURITE = gql`
  mutation AddFavouriteMutation($domain: Domain) {
    addFavourite(domain: $domain) @client
  }
`
const ADD_SUBDOMAIN_FAVOURITE = gql`
  mutation AddSubDomainFavourite($domain: Domain) {
    addSubDomainFavourite(domain: $domain) @client
  }
`

const DELETE_FAVOURITE = gql`
  mutation DeleteFavouriteMutation($domain: Domain) {
    deleteFavourite(domain: $domain) @client
  }
`
const DELETE_SUBDOMAIN_FAVOURITE = gql`
  mutation DeleteSubDomainFavourite($domain: Domain) {
    deleteSubDomainFavourite(domain: $domain) @client
  }
`

class AddFavourite extends Component {
  render() {
    const { domain } = this.props
    if (this.props.isSubDomain) {
      return (
        <Mutation
          mutation={
            this.props.isFavourite
              ? DELETE_SUBDOMAIN_FAVOURITE
              : ADD_SUBDOMAIN_FAVOURITE
          }
          variables={{ domain: this.props.domain }}
        >
          {favouriteMutation => (
            <AddFavouriteContainer onClick={favouriteMutation}>
              {this.props.isFavourite ? <ActiveHeart /> : <InActiveHeart />}
            </AddFavouriteContainer>
          )}
        </Mutation>
      )
    }

    console.log('ADD FAVORUITE', this.props.isFavourite)
    return (
      <Mutation
        mutation={this.props.isFavourite ? DELETE_FAVOURITE : ADD_FAVOURITE}
        variables={{
          domain: {
            name: domain.name,
            revealDate: domain.revealDate,
            registrationDate: domain.registrationDate,
            value: domain.value,
            highestBid: domain.highestBid,
            state: domain.state,
            owner: domain.owner
          }
        }}
      >
        {favouriteMutation => (
          <AddFavouriteContainer onClick={favouriteMutation}>
            {this.props.isFavourite ? <ActiveHeart /> : <InActiveHeart />}
          </AddFavouriteContainer>
        )}
      </Mutation>
    )
  }
}

const AddFavouriteContainer = styled('div')``

export default AddFavourite