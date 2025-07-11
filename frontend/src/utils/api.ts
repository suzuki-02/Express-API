import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import type { ApiResponse } from '@/types';

export const safeRequest = async <T>(
  requestFn: () => Promise<{ data: ApiResponse<T> }>,
  options?: { toast?: boolean }
): Promise<T | null> => {
  const showToast = options?.toast ?? true;

  try {
    const { data } = await requestFn();

    if (!data.success) {
      if (showToast) toast.error(data.message || 'Request failed');
      return null;
    } else {
      if (showToast) toast.success(data.message);
    }

    return data.data as T;
  } catch (error: unknown) {
    let msg = 'Unexpected error';

    if (error instanceof AxiosError) {
      msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        msg;
    } else if (error instanceof Error) {
      msg = error.message;
    }

    if (showToast) toast.error(msg);
    return null;
  }
};
