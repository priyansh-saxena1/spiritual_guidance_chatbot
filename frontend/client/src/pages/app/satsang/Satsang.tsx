import React from 'react';
import { Route, Switch } from 'wouter';
import { SatsangTopics } from './SatsangTopics';
import { SatsangDaily } from './SatsangDaily';
import { SatsangLibrary } from './SatsangLibrary';
import { SatsangReflections } from './SatsangReflections';

export const Satsang: React.FC = () => {
  return (
    <Switch>
      <Route path="/app/satsang" component={SatsangTopics} />
      <Route path="/app/satsang/topics" component={SatsangTopics} />
      <Route path="/app/satsang/daily" component={SatsangDaily} />
      <Route path="/app/satsang/scriptures" component={SatsangLibrary} />
      <Route path="/app/satsang/reflections" component={SatsangReflections} />
    </Switch>
  );
};