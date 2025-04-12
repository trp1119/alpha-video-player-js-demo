import type { IConfig } from 'alpha-video-player-js'

export type IItem = Omit<IConfig, 'container'> & {
  desc: string
  otherSrc?: string,
  width: number
  height: number
}

export type IPoint = {
  x: number,
  y: number
}
