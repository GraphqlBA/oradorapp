import React from 'react';
import { Redirect } from 'react-router';


class NewTalkScreen extends React.Component {
  state = {
    hasSubmitted: false
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ hasSubmitted: true });
  }

  render() {
    if (this.state.hasSubmitted) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Nueva Charla</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label htmlFor="evento">
              Buscá un evento
              <select id="evento" />
            </label>
          </p>
          <p>
            <label htmlFor="orador">
              Buscá un orador
              <select id="orador" />
            </label>
          </p>
          <p>
            <label htmlFor="titulo">
              Agregá un titulo
              <input type="text" id="titulo" />
            </label>
          </p>
          <p>
            <label htmlFor="description">
              Agregá una descripción
              <input type="text" id="description" />
            </label>
          </p>
          <p>
            <label htmlFor="tags" >
              Agregá etiquetas para catalogar la charla (separadas por comas)
              <input type="text" id="tags" />
            </label>
          </p>
          <button type="submit">Listo! Agregar charla</button>
        </form>
      </div>
    );
  }
}

export default NewTalkScreen;
