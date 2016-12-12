import React from 'react';
import { Redirect } from 'react-router';
import Relay from 'react-relay';
import styles from './styles.scss';

class TalkAddMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation { talkAdd }`;
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
      fragment on TalkAddPayload {
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

    this.props.relay.commitUpdate(new TalkAddMutation({
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
              <div className={styles.labelContent}>Buscá un evento</div>
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
              <div className={styles.labelContent}>Buscá un orador</div>
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
              <div className={styles.labelContent}>Agregá un titulo</div>
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
              <div className={styles.labelContent}>Agregá una descripción</div>
              <textarea
                id="description"
                onChange={this.handleDescriptionChange}
              >{this.state.description}</textarea>
            </label>
          </p>
          <p>
            <label htmlFor="tags" >
              <div className={styles.labelContent}>Agregá etiquetas para catalogar la charla (separadas por comas)</div>
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
        ${TalkAddMutation.getFragment('viewer')}
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
