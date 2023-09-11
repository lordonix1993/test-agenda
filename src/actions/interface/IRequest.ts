export interface IRequestApiData {
  text: string;
  language: string;
}

export interface IResponseApiData {
  success: boolean;
  data: IApiData[];
}

export interface IApiData {
  original: string;
  suggestions: string[];
}
