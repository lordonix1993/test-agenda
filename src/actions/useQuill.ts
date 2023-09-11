import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { IQuillProps, IQuillRange, IQuillTooltip } from './interface/IQuills';
import Quill from 'quill';
import { getCurrentWord, getListIdx } from '../utils/common';
import { IApiData, IResponseApiData } from './interface/IRequest';
import { getSuggestionsRequest } from './requests';
import { removeFromDictionary, saveToDictionary } from '../utils/dictionary';
import { useMutation } from '@tanstack/react-query';

const defaultQuillRange = {
  index: 0,
  length: 0,
};

export function useQuill(props: IQuillProps) {
  let reactQuillRef: ReactQuill | null = null;
  let quillRef: Quill | null = null;

  const { mutate: getSuggestionMutate } = useMutation({
    mutationFn: getSuggestionsRequest,
    onSuccess: (data) => setSuggestionsHandle(data),
  });

  const [word, setWord] = useState<string>('');
  const [ignoreList, setIgnoreList] = useState<string[]>([]);
  const [dictionaryList, setDictionaryList] = useState<string[]>([]);
  const [tooltipSuggestions, setTooltipSuggestions] = useState<string[]>([]);
  const [textQuill, setTextQuill] = useState<string>('');
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [suggestionsApi, setSuggestionsApi] = useState<IApiData[]>([]);
  const [rangeContent, setRangeContent] = useState<IQuillRange>(defaultQuillRange);
  const [cursorRange, setCursorRange] = useState<IQuillRange>(defaultQuillRange);

  const [positionTooltip, setPositionTooltip] = useState<IQuillTooltip>({
    top: 0,
    left: 0,
  });

  useEffect((): void => {
    attachQuillRefs();
    const dictionaryListJson = localStorage.getItem(props.quill.id);
    if (dictionaryListJson !== null) setDictionaryList(JSON.parse(dictionaryListJson));
  }, []);

  useEffect((): void => {
    attachQuillRefs();
  });

  const attachQuillRefs = (): void => {
    quillRef = (reactQuillRef as ReactQuill)?.getEditor?.();
  };

  const checkText = (): void => {
    let content = quillRef?.getText();
    getSuggestionMutate({ text: content !== undefined ? content : '', language: props.quill.id });
  };

  const handleChangeSelection = (range: IQuillRange, source: string): void => {
    const textEditor: string | undefined = quillRef?.getText();
    const fullText: string = textEditor || '';

    if (fullText !== textQuill) {
      closeTooltipHandle();
      setTextQuill(fullText);
    }

    if (range !== null) {
      setCursorRange(range);
      setRangeContent(range);
      setShowTooltip(false);
      if (source === 'user' && range.index + 1 !== quillRef?.getLength()) {
        let rangeNew = range.length === 0 ? getCurrentWord(range, fullText) : null;
        if (rangeNew !== null) {
          setRangeContent(rangeNew);
          const selectedContent = quillRef?.getText(rangeNew.index, rangeNew.length);
          if (selectedContent !== undefined) {
            setWord(selectedContent);
            if (selectedContent && ignoreList.indexOf(selectedContent) === -1) {
              for (const child of suggestionsApi) {
                if (child['original'] === selectedContent) showTooltipHandle(rangeNew, child['suggestions']);
              }
            }
          }
        }
      }
    }
  };

  const changeContentHandle = (suggestion: string, rangeContent: IQuillRange): void => {
    quillRef?.deleteText(rangeContent.index, rangeContent.length);
    quillRef?.insertText(rangeContent.index, suggestion);
    closeTooltipHandle();
  };

  const addToIgnoreList = (): void => {
    ignoreList.push(word);
    setIgnoreList(ignoreList);
    checkText();
    closeTooltipHandle();
  };

  const saveToDictionaryHandle = (): void => {
    const dictionary: string[] = saveToDictionary(props.quill.id, word);
    if (dictionary.length > 0) {
      setDictionaryList(dictionary);
      closeTooltipHandle();
    }
  };

  const setFromDictionaryHandle = (dict: string): void => {
    if (cursorRange.length > 0) {
      setRangeContent(cursorRange);
      changeContentHandle(dict, cursorRange);
    } else {
      quillRef?.insertText(cursorRange.index ?? quillRef?.getLength() - 1, dict + ' ');
      closeTooltipHandle();
    }
  };

  const removeFromDictionaryHandle = (index: number): void => {
    const dictionary: string[] = removeFromDictionary(props.quill.id, index);
    setDictionaryList(dictionary);
  };

  const showTooltipHandle = (range: IQuillRange, tooltipSuggestions: string[]): void => {
    props.closeAllTooltipEmit();
    let tooltip = quillRef?.getBounds(range.index);
    props.showTooltipMainEmit(props.quill.id);

    if (tooltip !== undefined) {
      setTooltipSuggestions(tooltipSuggestions);
      setPositionTooltip({
        top: tooltip.bottom + 10,
        left: tooltip.left,
      });
    }
  };
  const closeTooltipHandle = (): void => {
    props.closeAllTooltipEmit();
  };

  const setRef = (el: ReactQuill) => {
    reactQuillRef = el;
  };

  const setSuggestionsHandle = (data: IResponseApiData) => {
    try {
      const suggestions: IApiData[] = data.data;
      quillRef?.removeFormat(0, quillRef.getText().length - 1);
      for (const child of suggestions) {
        if (ignoreList.indexOf(child['original']) === -1) {
          const fullText = quillRef?.getText();
          let ranges = getListIdx(child['original'], fullText !== undefined ? fullText : '');
          for (const range of ranges) {
            if (range['index'] !== -1) quillRef?.formatText(range['index'], range['length'], { color: 'red' });
          }
        }
      }
      setSuggestionsApi(suggestions);
    } catch (e) {
      setSuggestionsApi([]);
    }
  };

  return {
    dictionaryList,
    reactQuillRef,
    rangeContent,
    showTooltip,
    positionTooltip,
    tooltipSuggestions,
    setFromDictionaryHandle,
    handleChangeSelection,
    removeFromDictionaryHandle,
    checkText,
    saveToDictionaryHandle,
    changeContentHandle,
    closeTooltipHandle,
    addToIgnoreList,
    setRef,
  };
}
