import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "./lib/api";
import api from './lib/api';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalActivo: false,
      personajes: [],
      personajeSeleccionado: {},
    }
  }
  componentDidMount(){
    api.getAllCharacters()
      .then(results => {
        this.setState({
          personajes:results
        })
      })
      .catch(e => console.error(e))
  }
  activarModal(id) {
    api.getCharacterbyId(id)
      .then(personaje => {
          this.setState({
          modalActivo: true,
          personajeSeleccionado: personaje
        })  
      })
    
  }
  desactivarModal() {
    this.setState({
      modalActivo: false
    })
  }
  renderCards(p) {
    return (
      <div key={p.id} className='Card' onClick={personaje => this.activarModal(p.id)}>
        <div className='Card-imagen'>
          <figure>
            <img alt='test' src={p.image} />
          </figure>
        </div>
        <div className='Card-descripcion'>
          <div className='Card-name'>
            <h3>{p.name}</h3>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { modalActivo, personajes } = this.state
    const cards = personajes.map(personaje => this.renderCards(personaje))
    console.log(cards)
    return (
      <div className="App">
        <div className='App-contenedor'>
        <div className='title'>
                  <figure>
                    <img className="title-img" alt='test' href="https://www.adultswim.com/videos/rick-and-morty/" src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fc%2Fc8%2FRick_and_Morty_logo.png&f=1&nofb=1"} />
                  </figure>
                </div>
          <div className='Cards-contenedor'>
            {cards}
          </div>
          { modalActivo ? (
            <div className='Modal' onClick={e => this.desactivarModal()}>
              <div className='Card-detalle'>
                <div className='Card-imagen'>
                  <figure>
                    <img alt='test' src={this.state.personajeSeleccionado.image} />
                  </figure>
                </div>
                <div className='Card-detalle-descripcion'>
                  <div className='descripcion'>
          <h3>{this.state.personajeSeleccionado.name}</h3>
                    <div className='caracteristica'>
                      <p>Status</p>
                      <p className='caracteristica-valor'>
                        {this.state.personajeSeleccionado.status}
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Species</p>
                      <p className='caracteristica-valor'>
                      {this.state.personajeSeleccionado.species}
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Gender</p>
                      <p className='caracteristica-valor'>
                      {this.state.personajeSeleccionado.gender}
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Origin</p>
                      <p className='caracteristica-valor'>
                      {this.state.personajeSeleccionado.origin.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null }
        </div>
      </div>
    );
  }
}
export default App;