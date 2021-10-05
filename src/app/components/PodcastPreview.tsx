import React from 'react';
import type Podcast from 'src/types/Podcast';
import hexToHue from 'src/app/features/hexToHue';
import useStore from 'src/app/features/useStore';

interface Props {
  podcast: Podcast;
  index?: number;
}

const PodcastPreview = ({ podcast, index }: Props): JSX.Element => {
  return podcast.showType === 'PREMIUM' ?
    PremiumPodcastPreview(podcast, index) :
    NonPremiumPodcastPreview(podcast, index);
};

const PremiumPodcastPreview = (podcast: Podcast, index?: number) => {
  const onClick = () => useStore.setState({ activePodcast: podcast });
  return (
    <div className="podcast-preview premium" onClick={onClick}>
      <img
        src={
          podcast.image ||
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
        }
        width="100"
        height="100"
        className="image"
        loading="lazy"
      />
      <div className="meta">
        <div className="title">{podcast.title}</div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: podcast.description }}
        />
        <div
          className="episode-count"
          style={{
            color: `hsl(${hexToHue(podcast.color || '#000')}, 50%, 80%)`,
          }}
        >
          {podcast.episodeCount} episode{podcast.episodeCount > 1 ? 's' : ''}
        </div>
      </div>
      <style jsx>{`
        .podcast-preview {
          animation-delay: ${(index || 0) * 10}ms;
        }
      `}</style>
    </div>
  );
};

const NonPremiumPodcastPreview = (podcast: Podcast, index?: number) => {
  const onClick = () => useStore.setState({ activePodcast: podcast });
  return (
    <div className="podcast-preview list" onClick={onClick}>
      <img
        src={
          podcast.image ||
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
        }
        width="100"
        height="100"
        className="image"
        loading="lazy"
      />
      <div className="title">{podcast.title}</div>
      <style jsx>{`
        .podcast-preview {
          animation-delay: ${(index || 0) * 10}ms;
        }
      `}</style>
    </div>
  );
};

export default PodcastPreview;
