import { Project, ProjectStyle } from "./project";

export interface Return {
  error?: string;
}
export interface ReturnString extends Return {
  result?: string;
}
export interface ReturnNumber extends Return {
  result?: number;
}
export interface ReturnProject extends Return {
  result?: Project;
}
export interface ReturnProjectStyle extends Return {
  result?: ProjectStyle;
}
export const error = (error: string, e: unknown): Return => {
  console.log(e);
  return { error };
};
