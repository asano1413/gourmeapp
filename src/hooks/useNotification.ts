import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useNotifications() {
  const { data, error } = useSWR('/api/notifications', fetcher);

  return {
    notifications: data,
    isLoading: !error && !data,
    isError: error,
  };
}