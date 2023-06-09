import * as Sentry from "@sentry/react";
import config from "../config";

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
  if (isLocal) {
    return;
  }
  Sentry.init({
    dsn: config.SENTRY_DSN,
  });
}

export function logError(error, errorInfo = null) {
  if (isLocal) {
    return;
  }
  console.log("sending error to sentry");
  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}
export function onError(error) {
  console.log("caught error");
  let errorInfo = {};
  let message = error.toString();

  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);

  alert(message);
}
