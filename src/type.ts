import type { IConfig } from 'alpha-video-player-js'

export enum ELocale {
  English = 'en',
  Chinese = 'zh',
}

export type ILocalizedText = Record<ELocale, string>

export interface IItem extends Omit<IConfig, 'container'> {
  id: string
  label: ILocalizedText
  desc: ILocalizedText
  otherSrc?: string
  width: number
  height: number
}

export interface IFeature {
  icon: string
  title: ILocalizedText
  description: ILocalizedText
}

export type IPoint = {
  x: number,
  y: number
}
