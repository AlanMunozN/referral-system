import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MyBonus from "./views/bonus";
import MyReferral from "./views/referrals";
import OpenPosition from "./views/positions";
import Page404 from "./views/notFound";
import ReferralCreate from './views/referalcreate';

const switchDashboardRoutes = (
    <Switch>
        <Route strict exact path="/" render={() => <Redirect to="/positions"/>}/>
        <Route strict exact path="/bonus" component={MyBonus} />
        <Route strict exact path="/referrals" component={MyReferral} />
        <Route strict exact path="/create" component={ReferralCreate} />
        <Route strict exact path="/positions" component={OpenPosition} />
        <Route path="*" component={Page404} />
    </Switch>
);

export default switchDashboardRoutes;
