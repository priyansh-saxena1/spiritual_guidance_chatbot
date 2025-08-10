import { Route, Switch, useLocation } from 'wouter';
import { AccountabilityHabits } from './AccountabilityHabits';
import { AccountabilitySOS } from './AccountabilitySOS';
import { AccountabilityPartner } from './AccountabilityPartner';

export const Accountability = () => {
  return (
    <Switch>
      <Route path="/app/accountability" component={AccountabilityHabits} />
      <Route path="/app/accountability/habits" component={AccountabilityHabits} />
      <Route path="/app/accountability/sos" component={AccountabilitySOS} />
      <Route path="/app/accountability/partner" component={AccountabilityPartner} />
    </Switch>
  );
};