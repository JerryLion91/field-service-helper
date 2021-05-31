import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Calling from './components/pages/Calling';
import ManagePeople from './components/pages/ManagePeople';
import Home from './components/pages/Home';

export default function App() {
  const [listToCall, setListToCall] = React.useState('list');

  return (
    <Router>
      <Switch>
        <Route path="/calling">
          <Calling listToCall={listToCall} setListToCall={setListToCall} />
        </Route>
        <Route path="/manage">
          <ManagePeople setListToCall={setListToCall} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

const list = [
  {
    phoneNumber: '11983031100',
    details: {
      name: 'Lucas',
      result: 'Option 1',
      calls: 1,
      callsArray: [
        {
          caller: 'Jeremias',
          date: '',
          notes: 'falei sobre uma coisa',
        },
      ],
      timestamp: 'hoje',
    },
  },
  {
    phoneNumber: '11983031101',
    details: {
      name: '',
      result: '',
      calls: 2,
      callsArray: [
        {
          caller: 'Jeremias',
          date: '',
          notes: 'falei sobre uma coisa',
        },
        {
          caller: 'Jeremias',
          date: '',
          notes: 'falei sobre uma segunda coisa',
        },
      ],
      timestamp: 'hoje',
    },
  },
  {
    phoneNumber: '11983031102',
    details: {
      name: '',
      result: '',
      calls: 0,
      timestamp: 'hoje',
    },
  },
];
