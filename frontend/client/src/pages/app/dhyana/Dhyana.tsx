import { Route, Switch } from 'wouter';
import { DhyanaTechniques } from './DhyanaTechniques';
import { DhyanaGuided } from './DhyanaGuided';
import { DhyanaTimer } from './DhyanaTimer';
import { DhyanaProgress } from './DhyanaProgress';

export const Dhyana = () => {
  return (
    <Switch>
      <Route path="/app/dhyana" component={DhyanaTechniques} />
      <Route path="/app/dhyana/techniques" component={DhyanaTechniques} />
      <Route path="/app/dhyana/guided" component={DhyanaGuided} />
      <Route path="/app/dhyana/timer" component={DhyanaTimer} />
      <Route path="/app/dhyana/progress" component={DhyanaProgress} />
    </Switch>
  );
};