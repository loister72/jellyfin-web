import { CollectionType } from '@jellyfin/sdk/lib/generated-client/models/collection-type';
import { describe, expect, test } from 'vitest';

import { CardShape } from 'components/cardbuilder/utils/shape';

import { getLatestCardOptions, getNextUpCardOptions, getResumeCardOptions } from './cardOptions';

describe('home section card options', () => {
    test('resume video cards include parent, year, and runtime context', () => {
        expect(getResumeCardOptions(false, 'Video', { enableOverflow: false })).toMatchObject({
            inheritThumb: true,
            shape: CardShape.Backdrop,
            showTitle: true,
            showParentTitle: true,
            showYear: true,
            showRuntime: true,
            lines: 3
        });
    });

    test('resume book cards stay portrait and do not reserve video metadata lines', () => {
        expect(getResumeCardOptions(true, 'Book', { enableOverflow: true })).toMatchObject({
            inheritThumb: false,
            shape: CardShape.PortraitOverflow,
            showYear: false,
            showRuntime: false,
            lines: 2
        });
    });

    test('next up cards use episode images setting and expose media context', () => {
        expect(getNextUpCardOptions(false, { enableOverflow: true })).toMatchObject({
            inheritThumb: true,
            shape: CardShape.BackdropOverflow,
            allowBottomPadding: false,
            showParentTitle: true,
            showYear: true,
            showRuntime: true,
            lines: 3
        });
    });

    test('latest movie cards stay poster-based and show runtime context', () => {
        expect(getLatestCardOptions(undefined, CollectionType.Movies, { enableOverflow: false })).toMatchObject({
            shape: CardShape.Portrait,
            preferThumb: null,
            showTitle: true,
            showYear: true,
            showRuntime: true,
            lines: 3
        });
    });

    test('latest photo cards suppress title and overlay playback affordances', () => {
        expect(getLatestCardOptions(undefined, CollectionType.Photos, { enableOverflow: false })).toMatchObject({
            showTitle: false,
            overlayPlayButton: false
        });
    });
});
