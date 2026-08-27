import type { SubmitFunction, SubmitOptions } from 'react-router-dom';

export function voidSubmit(
    submit: SubmitFunction,
    target: Parameters<SubmitFunction>[0],
    options?: SubmitOptions
) {
    submit(target, options);
}
