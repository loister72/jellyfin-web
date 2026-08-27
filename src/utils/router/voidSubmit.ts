import type { SubmitFunction, SubmitOptions } from 'react-router-dom';

export function voidSubmit(
    submit: SubmitFunction,
    target: Parameters<SubmitFunction>[0],
    options?: SubmitOptions
) {
    const submission = submit(target, options) as unknown;

    if (
        submission
        && typeof submission === 'object'
        && 'catch' in submission
        && typeof submission.catch === 'function'
    ) {
        submission.catch((err: unknown) => {
            console.error('[voidSubmit] submission failed', err);
        });
    }
}
