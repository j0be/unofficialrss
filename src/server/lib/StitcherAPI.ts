import type StitcherShow from 'src/types/StitcherShow';
import type Podcast from 'src/types/Podcast';
import dayjs from 'dayjs';
import StitcherEpisode from 'src/types/StitcherEpisode';
import Episode from 'src/types/Episode';

const BASE_URL = process.env.API_BASE;

export const getPremiumShows = async (): Promise<Podcast[]> =>
  (await get('/premium')).data.shows.map(stitcherShowToPodcast);

export const getFeedDetails = async (id: number, allPages?: boolean) => {
  let page: any,
    pageNumber = 0;
  let podcast: Podcast | undefined;
  let episodes: Episode[] = [];
  do {
    page = await get(`/show/${id}/latestEpisodes?page=${pageNumber}`);
    if (!podcast) podcast = stitcherShowToPodcast(page.data.shows[0]);
    episodes = [
      ...episodes,
      ...page.data.episodes.map(stitcherEpisodeToEpisode)
    ];
    pageNumber++;
  } while (
    allPages &&
    page.orchestration.start_index + page.orchestration.page_size <
      page.orchestration.total_count
  );
  return { podcast, episodes };
};

export const getSearchPremiumShows = async (
  query: string
): Promise<Podcast[]> => {
  const page = await get(`/search/shows?query=${query}`);
  try {
    const shows =
      page?.data?.shows
        .filter((show: StitcherShow) => show.restricted.includes('Premium'))
        .filter((show: StitcherShow) => !!show.id)
        .map(stitcherShowToPodcast) || [];
    return shows;
  } catch (err) {
    throw Error(err);
  }
};

const get = (url: string) => fetch(BASE_URL + url).then(response => response.text())
  .then(text => {
    try {
      const data = JSON.parse(text);
      return data;
    } catch (error: any) {
      throw Error(error);
    }
  });

const stitcherShowToPodcast = (show: StitcherShow): Podcast => ({
  id: show.id,
  title: show.title,
  link: show.link,
  description: show.description,
  htmlDescription: show.html_description,
  image: show.image_large,
  episodeCount: show.episode_count,
  color: show.color_primary,
  slug: show.slug
});

const stitcherEpisodeToEpisode = (episode: StitcherEpisode): Episode => ({
  id: episode.id,
  podcastID: episode.show_id,
  title: episode.title,
  link: episode.link,
  description: episode.description,
  htmlDescription: episode.html_description,
  published: dayjs(episode.date_published * 1000).toDate(),
  duration: episode.duration_restricted || episode.duration,
  guid: episode.guid,
  audioURL: episode.audio_url_restricted,
  slug: episode.slug,
  explicit: episode.explicit
});
