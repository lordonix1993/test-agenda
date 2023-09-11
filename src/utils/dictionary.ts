export const  saveToDictionary = (id: string, word: string): string[] => {
  const localStorageDictionary: string | null = localStorage.getItem(id);
  let dictionary: string[] = [];
  if (localStorageDictionary != null) {
    dictionary = JSON.parse(localStorageDictionary);
    if (!dictionary) dictionary = [];
  } else {
    dictionary = [];
  }
  dictionary.push(word);
  dictionary = [...new Set(dictionary)];
  localStorage.setItem(id, JSON.stringify(dictionary));
  return dictionary;
}

export const  removeFromDictionary = (id: string, index: number) => {
  const localStorageDictionary: string | null = localStorage.getItem(id);
  if (localStorageDictionary !== null) {
    let dictionary: string[] = JSON.parse(localStorageDictionary);
    dictionary.splice(index, 1);
    dictionary = [...new Set(dictionary)];
    localStorage.setItem(id, JSON.stringify(dictionary));
    return dictionary;
  }
  return [];
}
