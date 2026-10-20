import { NextResponse } from 'next/server';

const getBackendPaymentUrl = (request: Request) => {
  const url = new URL(request.url);
  const backendUrl = new URL(`${process.env.BACKEND_URL_LOCAL}/api/payment`);

  url.searchParams.forEach((value, key) => {
    backendUrl.searchParams.append(key, value);
  });

  return backendUrl;
};

const getResultUrl = (request: Request, status?: string, message?: string) => {
  const resultUrl = new URL('/payment/result', request.url);

  if (status) {
    resultUrl.searchParams.set('status', status);
  }

  if (message) {
    resultUrl.searchParams.set('message', message);
  }

  return resultUrl;
};

const forwardPaymentCallback = async (request: Request) => {
  const backendUrl = getBackendPaymentUrl(request);
  const headers = new Headers();
  const contentType = request.headers.get('content-type');

  if (contentType) {
    headers.set('content-type', contentType);
  }

  const body = request.method === 'POST' ? await request.arrayBuffer() : undefined;
  const query = new URL(request.url).searchParams;
  const formData =
    body && contentType?.includes('application/x-www-form-urlencoded')
      ? new URLSearchParams(new TextDecoder().decode(body))
      : null;

  try {
    const response = await fetch(backendUrl, {
      method: request.method,
      headers,
      body,
      redirect: 'manual',
      cache: 'no-store',
    });

    if (!response.ok && (response.status < 300 || response.status >= 400)) {
      return NextResponse.redirect(
        getResultUrl(request, 'error', 'Payment callback could not be processed.'),
      );
    }
  } catch {
    return NextResponse.redirect(
      getResultUrl(request, 'error', 'Payment service is temporarily unavailable.'),
    );
  }

  const status = query.get('status') ?? formData?.get('status') ?? 'success';
  return NextResponse.redirect(getResultUrl(request, status));
};

export const GET = forwardPaymentCallback;
export const POST = forwardPaymentCallback;
