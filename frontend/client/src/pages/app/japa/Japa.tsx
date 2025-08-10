import React from 'react';
import { Route, Switch } from 'wouter';
import { JapaCounter } from './JapaCounter';
import { JapaMantras } from './JapaMantras';
import { JapaLibrary } from './JapaLibrary';
import { JapaHistory } from './JapaHistory';

export const Japa: React.FC = () => {
  return (
    <Switch>
      <Route path="/app/japa" component={JapaMantras} />
      <Route path="/app/japa/mantras" component={JapaMantras} />
      <Route path="/app/japa/counter" component={JapaCounter} />
      <Route path="/app/japa/library" component={JapaLibrary} />
      <Route path="/app/japa/history" component={JapaHistory} />
    </Switch>
  );
};