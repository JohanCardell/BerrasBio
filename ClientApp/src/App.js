import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Listings } from './components/Listings';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Listings} />
        <Route path='/listings' component={Listings} />
      </Layout>
    );
  }
}
