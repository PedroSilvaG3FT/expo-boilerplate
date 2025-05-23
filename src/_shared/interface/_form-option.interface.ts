import { ModelControlType } from "../types/model-control.type";

export interface IFormOption<Data = ModelControlType> {
  value: Data;
  label: string;
}
