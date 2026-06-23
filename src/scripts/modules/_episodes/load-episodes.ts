export interface Episode {
  id: number;
  season: number;
  date: string;
  cover: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
  audioSrc: string;
  streaming: {
    spotify: string;
    soundcloud: string;
    appleMusic: string;
  };
  transcription: string;
  hashtags: string[];
}

interface SeasonFile {
  season: number;
  episodes: Episode[];
}

interface IndexJson {
  episodes: {
    seasons: {
      season: number;
      file: string;
    }[];
  };
}

interface SeasonModule {
  default: SeasonFile;
}

async function loadAllEpisodes(): Promise<Episode[]> {
  const indexModule = await import('/src/data/episodes/index.json');
  const indexData = indexModule.default as IndexJson;

  const seasonModules = import.meta.glob<SeasonModule>('/src/data/episodes/*.json');

  const episodes: Episode[] = [];

  for (const season of indexData.episodes.seasons) {
    const path = `/src/data/episodes/${season.file}`;

    if (Object.hasOwn(seasonModules, path)) {
      const module_ = await seasonModules[path]();
      episodes.push(...module_.default.episodes);
    } else {
      console.error(`Season file not found: ${path}`);
    }
  }

  return episodes;
}

export const allEpisodes = await loadAllEpisodes();
