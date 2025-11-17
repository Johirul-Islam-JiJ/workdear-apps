import { User } from "./User";

export interface TopWorker {
  id: number;
  user: User;
}

export interface TopJobPoster {
  id: number;
  job_posted_count: string;
  user: User;
}
