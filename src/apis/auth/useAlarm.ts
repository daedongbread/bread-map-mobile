import { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetcher } from '@/apis/fetcher';

interface GetAlarmResponse {
  data: {
    alarmOn: boolean;
  };
}

interface UpdateAlarmRequest {
  deviceToken: string;
}
interface UpdateAlarmResponse {}

const getAlarm = () => {
  return fetcher.get<GetAlarmResponse>('/v1/users/alarm').then(res => res.data);
};

const updateAlarm = ({ deviceToken }: UpdateAlarmRequest) => {
  return fetcher
    .patch<UpdateAlarmResponse>('/v1/users/alarm', {
      deviceToken,
    })
    .then(res => res.data);
};

export const useAlarm = () => {
  const { data, refetch } = useQuery({
    queryKey: 'alarm',
    queryFn: getAlarm,
    staleTime: 5000,
  });

  const { mutate } = useMutation({
    mutationKey: 'alarm',
    mutationFn: updateAlarm,
    onSuccess: () => {
      refetch();
    },
  });

  const update = useCallback(
    (deviceToken: string) => {
      mutate({ deviceToken });
    },
    [mutate]
  );

  return {
    alarmOn: data?.data.alarmOn,
    updateAlarm: update,
  };
};
