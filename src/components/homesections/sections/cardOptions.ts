import type { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import { CollectionType } from '@jellyfin/sdk/lib/generated-client/models/collection-type';
import type { MediaType } from '@jellyfin/sdk/lib/generated-client/models/media-type';

import { getBackdropShape, getPortraitShape, getSquareShape } from 'components/cardbuilder/utils/shape';
import type { CardOptions } from 'types/cardOptions';

import type { SectionOptions } from './section';

type HomeCardOptions = Omit<CardOptions, 'items'>;

function getDefaultHomeCardOptions(enableOverflow: boolean, cardLayout = false): HomeCardOptions {
    return {
        overlayText: false,
        centerText: !cardLayout,
        cardLayout,
        context: 'home'
    };
}

export function getResumeCardOptions(
    useEpisodeImages: boolean,
    mediaType: MediaType,
    { enableOverflow }: SectionOptions
): HomeCardOptions {
    const cardLayout = false;
    const isBook = mediaType === 'Book';
    const isVideo = mediaType === 'Video';

    return {
        ...getDefaultHomeCardOptions(enableOverflow, cardLayout),
        preferThumb: true,
        inheritThumb: !useEpisodeImages,
        shape: isBook ? getPortraitShape(enableOverflow) : getBackdropShape(enableOverflow),
        showTitle: true,
        showParentTitle: true,
        lazy: true,
        showDetailsMenu: true,
        overlayPlayButton: true,
        allowBottomPadding: false,
        showYear: isVideo,
        showRuntime: isVideo,
        lines: isVideo ? 3 : 2
    };
}

export function getNextUpCardOptions(
    useEpisodeImages: boolean,
    { enableOverflow }: SectionOptions
): HomeCardOptions {
    const cardLayout = false;

    return {
        ...getDefaultHomeCardOptions(enableOverflow, cardLayout),
        preferThumb: true,
        inheritThumb: !useEpisodeImages,
        shape: getBackdropShape(enableOverflow),
        showTitle: true,
        showParentTitle: true,
        lazy: true,
        overlayPlayButton: true,
        allowBottomPadding: !enableOverflow,
        showYear: true,
        showRuntime: true,
        lines: 3
    };
}

export function getLatestCardOptions(
    itemType: BaseItemKind | undefined,
    viewType: string | null | undefined,
    { enableOverflow }: SectionOptions
): HomeCardOptions {
    const cardLayout = false;
    let shape;

    if (
        itemType === 'Channel'
        || viewType === CollectionType.Movies
        || viewType === CollectionType.Books
        || viewType === CollectionType.Tvshows
    ) {
        shape = getPortraitShape(enableOverflow);
    } else if (viewType === CollectionType.Music || viewType === CollectionType.Homevideos) {
        shape = getSquareShape(enableOverflow);
    } else {
        shape = getBackdropShape(enableOverflow);
    }

    const isMovieLike = viewType === CollectionType.Movies || !viewType;

    return {
        ...getDefaultHomeCardOptions(enableOverflow, cardLayout),
        shape,
        preferThumb: viewType !== CollectionType.Movies
            && viewType !== CollectionType.Tvshows
            && itemType !== 'Channel'
            && viewType !== CollectionType.Music ? 'auto' : null,
        preferParentPoster: true,
        showUnplayedIndicator: false,
        showChildCountIndicator: true,
        overlayPlayButton: viewType !== CollectionType.Photos,
        allowBottomPadding: !enableOverflow && !cardLayout,
        showTitle: viewType !== CollectionType.Photos,
        showYear: viewType === CollectionType.Movies || viewType === CollectionType.Tvshows || !viewType,
        showRuntime: isMovieLike,
        showParentTitle: viewType === CollectionType.Music
            || viewType === CollectionType.Tvshows
            || !viewType
            || (cardLayout && viewType === CollectionType.Tvshows),
        lines: isMovieLike ? 3 : 2
    };
}
