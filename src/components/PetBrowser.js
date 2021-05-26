import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    const pets = this.props.pets.map(pet => (
      <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet} />
    ))
    console.log("in pet browser", pets)
    return <div className="ui cards">{pets}</div>
  }
}

export default PetBrowser
