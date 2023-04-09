export interface EventI {
  date: string;
  type: EventTypeT;
  name: string;
  members: string[];
  place: string;
}

export enum EventTypeT {
  private = 'private',
  meeting = 'meeting',
  corporate = 'corporate',
  other = 'other',
}

export interface GeneratingEventI {
  date: string;
  type: string;
  name: string;
  members: string[];
  place: string;
}

export interface TerminalParamsI {
  from: string,
  to: string,
  entry: string,
  out: string,
}
