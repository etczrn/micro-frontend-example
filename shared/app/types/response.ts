export type ServerActionResponse<T> = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
};
