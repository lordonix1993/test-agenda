import { IQuillRange } from '../actions/interface/IQuills';

export const getCurrentWord = (range: IQuillRange, fullText: string): IQuillRange | null => {
  let currentIndex: number = range.index;
  let startIndex: number = 0;
  let lengthWord: number = 0;
  let endIndex: number = fullText.length - 1;
  const regWord: RegExp = /\w|[é]/;
  let i: number = currentIndex;

  while (i >= 0) {
    if (fullText[i].match(regWord)) {
      startIndex = i;
    } else {
      break;
    }
    i--;
  }

  let j: number = startIndex;

  while (j <= endIndex) {
    if (fullText[j].match(regWord)) {
      lengthWord++;
    } else {
      break;
    }
    j++;
  }

  if (lengthWord > 0) {
    return { index: startIndex, length: lengthWord };
  }

  return null;
};

export const getListIdx = (substr: string, str: string): IQuillRange[] => {
  let listIdx: IQuillRange[] = [];
  let lastIndex: number = -1;
  while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
    let range: IQuillRange | null = null;
    if (lastIndex > 0) {
      if (!/\w|[é]/i.test(str[lastIndex + substr.length]) && !/\w|[é]/i.test(str[lastIndex - 1])) {
        range = { index: lastIndex, length: substr.length };
      }
    } else {
      if (!/\w|[é]/i.test(str[lastIndex + substr.length])) {
        range = { index: lastIndex, length: substr.length };
      }
    }
    if (range !== null) {
      listIdx.push({ index: lastIndex, length: substr.length });
    }
  }
  return listIdx;
};
