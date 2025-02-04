export const serializeState = <T>(state: T): string =>
  JSON.stringify(state);

export const deserializeState = <T>(state: string): T =>
  JSON.parse(state);