import { useCallback, useEffect, useState } from "react";

export function useAsync(fn, deps = []) {
  const [state, setState] = useState({ status: "loading", data: null });
  const run = useCallback(() => {
    let cancelled = false;
    setState({ status: "loading", data: null });
    fn()
      .then((data) => !cancelled && setState({ status: "ok", data }))
      .catch(() => !cancelled && setState({ status: "error", data: null }));
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(run, [run]);
  return { ...state, reload: run };
}
