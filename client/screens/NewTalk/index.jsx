import React from 'react';
import { Redirect } from 'react-router';
import Relay from 'react-relay';

class AddTalkMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation { addTalk }`;
  }

  getVariables() {
    return {
      title: this.props.title,
      description: this.props.description,
      topics: this.props.topics,
      speakerIds: this.props.speakerIds,
      eventId: this.props.eventId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddTalkPayload {
        viewer { talks }
        speakers { talks }
        event { talks }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          viewer: this.props.viewer.id,
          speakers: this.props.speakerIds,
          event: this.props.eventId
        }
      }
    ];
  }
}


class NewTalkScreen extends React.Component {
  state = {
    eventId: this.props.viewer.events.edges[0].node.id,
    speakerId: this.props.viewer.speakers.edges[0].node.id,
    title: '',
    description: '',
    topics: '',
    redirectTo: null
  };

  handleEventChange = (ev) => {
    this.setState({
      eventId: ev.target.value
    });
  }

  handleSpeakerChange = (ev) => {
    this.setState({
      speakerId: ev.target.value
    });
  }

  handleTitleChange = (ev) => {
    this.setState({
      title: ev.target.value
    });
  }

  handleDescriptionChange = (ev) => {
    this.setState({
      description: ev.target.value
    });
  }

  handleTopicsChange = (ev) => {
    this.setState({
      topics: ev.target.value
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    this.props.relay.commitUpdate(new AddTalkMutation({
      viewer: this.props.viewer,
      title: this.state.title,
      description: this.state.description,
      topics: this.state.topics.split(',').map(t => t.trim()).filter(Boolean),
      speakerIds: [this.state.speakerId],
      eventId: this.state.eventId
    }), {
      onSuccess: () => { this.setState({ redirectTo: '/' }); }
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <div>
        <h1>Nueva Charla</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label htmlFor="evento">
              Buscá un evento
              <select
                id="evento"
                value={this.state.eventId}
                onChange={this.handleEventChange}
              >
                {this.props.viewer.events.edges.map((edge) => {
                  const event = edge.node;

                  return (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  );
                })}
              </select>
            </label>
          </p>
          <p>
            <label htmlFor="orador">
              Buscá un orador
              <select
                id="orador"
                value={this.state.speakerId}
                onChange={this.handleSpeakerChange}
              >
                {this.props.viewer.speakers.edges.map((edge) => {
                  const speaker = edge.node;

                  return (
                    <option key={speaker.id} value={speaker.id}>
                      {speaker.firstName} {speaker.lastName}
                    </option>
                  );
                })}
              </select>
            </label>
          </p>
          <p>
            <label htmlFor="titulo">
              Agregá un titulo
              <input
                type="text"
                id="titulo"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </label>
          </p>
          <p>
            <label htmlFor="description">
              Agregá una descripción
              <input
                type="text"
                id="description"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </label>
          </p>
          <p>
            <label htmlFor="tags" >
              Agregá etiquetas para catalogar la charla (separadas por comas)
              <input
                type="text"
                id="tags"
                value={this.state.topics}
                onChange={this.handleTopicsChange}
              />
            </label>
          </p>
          <button type="submit">Listo! Agregar charla</button>
        </form>
      </div>
    );
  }
}

export default Relay.createContainer(NewTalkScreen, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id
        ${AddTalkMutation.getFragment('viewer')}
        speakers(first: 10) {
          edges {
            node {
              id
              firstName
              lastName
            }
          }
        }
        events(first: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `
  }
});
