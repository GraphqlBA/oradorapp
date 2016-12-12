import React from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';


export default class TopBar extends React.Component {
  handleFormSubmit = (ev) => {
    ev.preventDefault();

    let to = '/';
    const query = this.searchInput.value;
    if (query) {
      to += `?q=${query}`;
    }
    this.props.router.transitionTo(to);
  }

  render() {
    return (
      <div className={styles.topBar}>
        <Link to="/"><span className={styles.logo}>OradorApp</span></Link>
        <div className={styles.headerActions}>
          <form className={styles.form} onSubmit={this.handleFormSubmit}>
            <input
              ref={(el) => { this.searchInput = el; }}
              className={styles.input}
              placeholder="Buscar oradores o charlas..."
            />
            <i className="icon ion-ios-search" />
          </form>
          <Link className={styles.action} to="/talk/new">Agregar</Link>
        </div>
      </div>
    );
  }
}
