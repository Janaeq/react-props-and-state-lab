import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    })
  }

  onFindPetsClick = () => {
    let url = ""
    if (this.state.filters.type === 'all') {
      url = "/api/pets"
    } else {
      url = "/api/pets?type=" + this.state.filters.type
    }

    fetch(url) 
      .then(r => r.json())
      .then(data => {
        this.setState({ pets: data }, () => console.log("in fetch", this.state))
      })
  }

  onAdoptPet = (id) => {
    this.setState(previousState => {
      const updatedPets = previousState.pets.map(pet => {
        if (pet.id === id) {
          return {
            ...pet,
            isAdopted: !pet.isAdopted
          }
        }
        return pet
      })
      return {
        pets: updatedPets
      }
    })
  }
  
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
