import { toast } from 'react-toastify';
import type { ApiResponse } from '../types/types';
import { AxiosError } from 'axios';

export const safeRequest = async <T>(
  requestFn: () => Promise<{ data: ApiResponse<T> }>
): Promise<T | null> => {
  try {
    const { data } = await requestFn();

    if (!data.success) {
      toast.error(data.message || 'Request failed');
      return null;
    } else {
      toast.success(data.message);
    }

    return data.data as T;
  } catch (error: unknown) {
    let msg = 'Unexpected error';

    // Narrow the error type using AxiosError
    if (error instanceof AxiosError) {
      msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        msg;
    } else if (error instanceof Error) {
      msg = error.message;
    }

    toast.error(msg);
    return null;
  }
};
