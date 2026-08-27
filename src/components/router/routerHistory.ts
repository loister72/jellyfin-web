/* eslint-disable @typescript-eslint/no-explicit-any */
import type { History, Listener, To } from 'history';

import Events, { type Event } from 'utils/events';

const HISTORY_UPDATE_EVENT = 'HISTORY_UPDATE';

type RouterState = Pick<History, 'location'> & {
    historyAction: History['action'];
};

type RouterCompat = {
    state: RouterState;
    createHref: (to: any) => string;
    navigate: {
        (to: number): void | Promise<void>;
        (to: To | null, options?: { replace?: boolean; state?: any }): void | Promise<void>;
    };
    subscribe: (callback: (state: RouterState) => void) => () => void;
};

const handleNavigation = (navigation: void | Promise<void>) => {
    if (navigation) {
        navigation.catch(err => {
            console.error('[RouterHistory] navigation failed', err);
        });
    }
};

export class RouterHistory implements History {
    _router: RouterCompat;
    createHref: (arg: any) => string;

    constructor(router: RouterCompat) {
        this._router = router;

        this._router.subscribe(state => {
            console.debug('[RouterHistory] history update', state);
            Events.trigger(document, HISTORY_UPDATE_EVENT, [ state ]);
        });

        this.createHref = router.createHref;
    }

    get action() {
        return this._router.state.historyAction;
    }

    get location() {
        return this._router.state.location;
    }

    back() {
        handleNavigation(this._router.navigate(-1));
    }

    forward() {
        handleNavigation(this._router.navigate(1));
    }

    go(delta: number) {
        handleNavigation(this._router.navigate(delta));
    }

    push(to: To, state?: any) {
        handleNavigation(this._router.navigate(to, { state }));
    }

    replace(to: To, state?: any): void {
        handleNavigation(this._router.navigate(to, { state, replace: true }));
    }

    block() {
        // NOTE: We don't seem to use this functionality, so leaving it unimplemented.
        throw new Error('`history.block()` is not implemented');
        return () => undefined;
    }

    listen(listener: Listener) {
        const compatListener = (_e: Event, state: RouterState) => {
            return listener({ action: state.historyAction, location: state.location });
        };

        Events.on(document, HISTORY_UPDATE_EVENT, compatListener);

        return () => Events.off(document, HISTORY_UPDATE_EVENT, compatListener);
    }
}

export const createRouterHistory = (router: RouterCompat): History => {
    return new RouterHistory(router);
};

/* eslint-enable @typescript-eslint/no-explicit-any */
