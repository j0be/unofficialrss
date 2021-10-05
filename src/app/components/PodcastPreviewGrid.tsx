import React from 'react';
import type Podcast from 'src/types/Podcast';
import Loader from './Loader';
import PodcastPreview from './PodcastPreview';

interface Props {
  podcasts?: Podcast[];
}

const PodcastPreviewGrid = ({ podcasts }: Props): JSX.Element => {
  return (
    <div className="podcast-grid">
      <div className="loading">
        <Loader />
      </div>
      <div className="podcast-preview-grid">
        {podcasts?.length ? (
          podcasts.map((podcast, i) => (
            <PodcastPreview key={podcast.id} podcast={podcast} index={i} />
          ))
        ) : (
          <div className="loading">
            <Loader />
          </div>
        )}
      </div>
      <style jsx>{`
        .podcast-preview-grid {
          opacity: ${podcasts?.length ? 1 : 0};
        }
        .loading {
          opacity: ${podcasts?.length ? 0 : 1};
          transform: scale(${podcasts?.length ? 0 : 100}%);
        }
      `}</style>
    </div>
  );
};

export default PodcastPreviewGrid;
