import type { NavigateFunction, NavigateOptions, To } from 'react-router-dom';

export function voidNavigate(
    navigate: NavigateFunction,
    to: To | number,
    options?: NavigateOptions
) {
    const navigation = (typeof to === 'number' ?
        navigate(to) :
        navigate(to, options)) as unknown;

    if (
        navigation
        && typeof navigation === 'object'
        && 'catch' in navigation
        && typeof navigation.catch === 'function'
    ) {
        navigation.catch((err: unknown) => {
            console.error('[voidNavigate] navigation failed', err);
        });
    }
}
