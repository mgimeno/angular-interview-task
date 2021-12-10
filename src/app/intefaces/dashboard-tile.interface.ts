export interface IDashboardTile {
  id: string,
  title: string,
  onClickPath: string | undefined,
  class: string,
  count: number | undefined
}