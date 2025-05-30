export interface IResponseUnprocessableEntity {
  detail: {
    loc: any[];
    msg: string;
    type: string;
  }[];
}

export interface IBaseReponse<Data> {
  data: Data;
  status: number;
  messages: string[];
  success: boolean;
}
