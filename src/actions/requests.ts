import { http } from '../libs/http';
import { IRequestApiData, IResponseApiData } from './interface/IRequest';
import { AxiosResponse } from 'axios';

export const getSuggestionsRequest = async (data: IRequestApiData): Promise<IResponseApiData> => {
  let suggestions: IResponseApiData = { success: false, data: [] };
  try {
    const resultData: AxiosResponse<IResponseApiData> = await http.post('/suggestion', data);
    suggestions = resultData.data;
  } catch (e) {
    console.log(`Error request data: ${(e as Error).message}`);
  }
  return suggestions;
};
