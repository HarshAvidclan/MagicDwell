import type { AxiosError, AxiosResponse } from 'axios';
import { ToastService } from '../Toast/ToastService';
import { HookLoggerConfig } from './HookLoggerConfig';
import { useLoaderStore } from '../../Stores/LoaderStore';
import { AuthService } from './AuthService';
import { APIBaseResponse } from './Result/Common';

function handleMessages<T>(result: APIBaseResponse<T>): void {
  result.ErrorMessage?.forEach((msg) => ToastService.ERROR(msg));
  result.InfoMessage?.forEach((msg) => ToastService.INFO(msg));
  result.WarningMessage?.forEach((msg) => ToastService.WARNING(msg));
  result.ValidationMessage?.forEach((msg) => ToastService.ERROR(msg));
  result.SuccessMessage?.forEach((msg) => ToastService.SUCCESS(msg));
}

function handleStatusCode<T>(status: number, requestUrl?: string): APIBaseResponse<T> | null {
  console.log("a-----------------------------",requestUrl);
  console.log("a-----------------------------",status);

  switch (status) {
    case 0:
      const message = requestUrl
        ? `API server is offline or unreachable. (${requestUrl})`
        : 'API server is offline or unreachable.';

      ToastService.ERROR(message);
      return {
        Data: {} as T,
        TotalCount: 0,
        ErrorMessage: ['API server is offline or unreachable.'],
        InfoMessage: [],
        WarningMessage: [],
        ValidationMessage: [],
        SuccessMessage: [],
        HasError: true,
        ResponseCode: 'NETWORK_OFFLINE',
        StatusCode: 0,
      };

    case 401:
      ToastService.WARNING("Unauthorized. You don't have access to this path.");
      AuthService.clearAllData();
      return {
        Data: {} as T,
        TotalCount: 0,
        ErrorMessage: ['Unauthorized access'],
        InfoMessage: [],
        WarningMessage: [],
        ValidationMessage: [],
        SuccessMessage: [],
        HasError: true,
        ResponseCode: 'UNAUTHORIZED',
        StatusCode: 401,
      };

    case 403:
      ToastService.ERROR('You are not allowed to use this route.');
      return {
        Data: {} as T,
        TotalCount: 0,
        ErrorMessage: ['You are not allowed to use this route.'],
        InfoMessage: [],
        WarningMessage: [],
        ValidationMessage: [],
        SuccessMessage: [],
        HasError: true,
        ResponseCode: 'FORBIDDEN',
        StatusCode: 403,
      };

    case 404:
      const notFoundMessage = requestUrl
        ? `Request to this URL was not found: ${requestUrl}`
        : 'The requested resource was not found.';
      ToastService.ERROR(notFoundMessage);
      return {
        Data: {} as T,
        TotalCount: 0,
        ErrorMessage: [notFoundMessage],
        InfoMessage: [],
        WarningMessage: [],
        ValidationMessage: [],
        SuccessMessage: [],
        HasError: true,
        ResponseCode: 'NOT_FOUND',
        StatusCode: 404,
      };

    default:
      return null;
  }
}

function handleAxiosError<T>(axiosError: AxiosError<APIBaseResponse<T>>): APIBaseResponse<T> {
  const status = axiosError?.response?.status;
  const requestUrl = axiosError?.config?.url;
  const statusHandled = status
    ? handleStatusCode<T>(status, requestUrl)
    : handleStatusCode<T>(0, requestUrl);

  if (axiosError?.response?.data) {
    const result = axiosError.response.data;
    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.error('[API Error Response]', result);
    }
    handleMessages(result);
    return result;
  }

  if (statusHandled) {
    return statusHandled;
  }

  ToastService.ERROR(axiosError.message || 'Unexpected API error');
  throw axiosError;
}

async function processApiResponse<T>(
  promise: Promise<AxiosResponse<APIBaseResponse<T>>>,
  requestData?: unknown
): Promise<APIBaseResponse<T>> {
  const { startLoading, stopLoading } = useLoaderStore.getState();
  startLoading();

  try {
    if (HookLoggerConfig.ENABLE_LOGGING && requestData !== undefined) {
      console.log('[API Request]', requestData);
    }

    const response = await promise;
    const result = response.data;

    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log('[API Response]', result);
    }

    handleMessages(result);
    return result;
  } catch (err: unknown) {
    return handleAxiosError(err as AxiosError<APIBaseResponse<T>>);
  } finally {
    stopLoading();
  }
}

async function processFullApiResponse<T>(
  promise: Promise<AxiosResponse<APIBaseResponse<T>>>,
  requestData?: unknown
): Promise<APIBaseResponse<T>> {
  const { startLoading, stopLoading } = useLoaderStore.getState();
  startLoading();

  try {
    if (HookLoggerConfig.ENABLE_LOGGING && requestData !== undefined) {
      console.log('[API Request]', requestData);
    }

    const response = await promise;
    const result = response.data;

    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log('[API Response]', result);
    }

    return result;
  } catch (err: unknown) {
    return handleAxiosError(err as AxiosError<APIBaseResponse<T>>);
  } finally {
    stopLoading();
  }
}

export async function handleApiResponse<T>(
  promise: Promise<AxiosResponse<APIBaseResponse<T>>>,
  requestData?: unknown
): Promise<T> {
  const result = await processApiResponse<T>(promise, requestData);
  return result.Data;
}

export async function handleFullApiResponse<T>(
  promise: Promise<AxiosResponse<APIBaseResponse<T>>>,
  requestData?: unknown
): Promise<APIBaseResponse<T>> {
  return processFullApiResponse<T>(promise, requestData);
}