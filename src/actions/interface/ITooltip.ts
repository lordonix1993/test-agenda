import { IQuillRange, IQuillTooltip } from './IQuills';

export interface ITooltipProps {
  saveToDictionaryEmit(): void;
  changeContentEmit(suggestion: string, rangeContent: IQuillRange): void;
  closeTooltipEmit(): void;
  addToIgnore(): void;
  showTooltip: boolean;
  rangeContent: IQuillRange;
  positionTooltip: IQuillTooltip;
  tooltipSuggestions: string[];
}
