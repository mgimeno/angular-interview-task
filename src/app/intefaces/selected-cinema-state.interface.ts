import { IScreenContent, IScreeningContent } from ".";

export interface ISelectedCinemaState {
    id: number | undefined,
    name: string | undefined,
    screens: IScreenContent[] | undefined
    screenings: IScreeningContent[] | undefined,
    selectedScreen: IScreenContent | undefined,
    selectedScreening: IScreeningContent | undefined,
    isLoading: boolean,
    isLoadingScreens: boolean,
    isLoadingScreenings: boolean
  }