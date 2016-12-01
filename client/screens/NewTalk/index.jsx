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
            <label>
              Buscá un evento
              <select />
            </label>
          </p>
          <p>
            <label>
              Buscá un orador
              <select />
            </label>
          </p>
          <p>
            <label>
              Agregá un titulo
              <input type="text" />
            </label>
          </p>
          <p>
            <label>
              Agregá una descripción
              <input type="text" />
            </label>
          </p>
          <p>
            <label>
              Agregá etiquetas para catalogar la charla (separadas por comas)
              <input type="text" />
            </label>
          </p>
          <button type="submit">Listo! Agregar charla</button>
        </form>
      </div>
    );
  }
}

export default NewTalkScreen;
