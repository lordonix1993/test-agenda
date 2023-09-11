export interface IQuill {
  id: string;
  placeholder: string;
  showTooltip: boolean;
  modules: IQuillModule;
}

export interface IQuillModule {
  toolbar: boolean;
}

export interface IQuillProps {
  quill: IQuill;
  closeAllTooltipEmit(): void;
  showTooltipMainEmit(id: string): void;
}

export interface IQuillRange {
  index: number;
  length: number;
}

export interface IQuillTooltip {
  top: number;
  left: number;
}
