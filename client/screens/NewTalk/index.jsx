import React from 'react';
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
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on TalkAddPayload {
              addedTalk { id }
            }
          `
        ]
      }
    ];
  }
}

const FormField = ({ label, children }) => (
  <div className={styles.formField}>
    <label>
      <div className={styles.formFieldLabel}>{label}</div>
      {children}
    </label>
  </div>
);


class NewTalkScreen extends React.Component {
  state = {
    eventId: this.props.viewer.events.edges[0].node.id,
    speakerIds: [this.props.viewer.speakers.edges[0].node.id],
    topicIds: [],
    title: '',
    description: ''
  };

  isFormDisabled = () => (
    !this.state.eventId ||
      !this.state.speakerIds.length ||
      !this.state.title ||
      !this.state.description
  )

  handleEventChange = (ev) => {
    this.setState({
      eventId: ev.target.value
    });
  }

  handleSpeakerChange = (ev) => {
    this.setState({
      speakerIds: [...ev.target.options]
        .filter(option => option.selected)
        .map(option => option.value)
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
      topicIds: [...ev.target.options]
        .filter(option => option.selected)
        .map(option => option.value)
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    if (this.isFormDisabled()) return;

    this.props.relay.commitUpdate(new TalkAddMutation({
      viewer: this.props.viewer,
      title: this.state.title,
      description: this.state.description,
      topics: this.state.topicIds,
      speakerIds: this.state.speakerIds,
      eventId: this.state.eventId
    }), {
      onSuccess: ({ talkAdd }) => {
        this.props.router.transitionTo(`/talk/${talkAdd.addedTalk.id}`);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Nueva Charla</h1>
        <form onSubmit={this.handleSubmit}>
          <FormField label="Buscá un evento">
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
          </FormField>
          <FormField label="Buscá un orador">
            <select
              id="orador"
              value={this.state.speakerIds}
              multiple
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
          </FormField>
          <FormField label="Agregá un titulo">
            <input
              type="text"
              id="titulo"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </FormField>
          <FormField label="Agregá una descripción">
            <textarea
              id="description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </FormField>
          <FormField label="Tópicos relacionados a la charla">
            <select
              id="tags"
              value={this.state.topicIds}
              multiple
              onChange={this.handleTopicsChange}
            >
              {this.props.viewer.topics.edges.map((edge) => {
                const topic = edge.node;

                return (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                );
              })}
            </select>
          </FormField>
          Listo? {
            <button
              type="submit"
              disabled={this.isFormDisabled()}
            >
              Agregar charla
            </button>
          }
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
        speakers(first: 1000) {
          edges {
            node {
              id
              firstName
              lastName
            }
          }
        }
        events(first: 1000) {
          edges {
            node {
              id
              title
            }
          }
        }
        topics(first: 1000) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `
  }
});
