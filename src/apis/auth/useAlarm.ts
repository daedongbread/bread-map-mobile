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
  toggleValue: boolean;
}
interface UpdateAlarmResponse {}

const getAlarm = () => {
  return fetcher.get<GetAlarmResponse>('/v1/users/alarm').then(res => res.data);
};

const updateAlarm = async ({ deviceToken, toggleValue }: UpdateAlarmRequest) => {
  return await fetcher
    .patch<UpdateAlarmResponse>('/v1/users/alarm', {
      deviceToken,
      noticeAgree: toggleValue,
    })
    .then(res => res.data);
};

export const useAlarm = () => {
  const { data, refetch } = useQuery({
    queryKey: 'alarm',
    queryFn: getAlarm,
  });

  const { mutate } = useMutation({
    mutationKey: 'alarm',
    mutationFn: updateAlarm,
    onSuccess: () => {
      refetch();
    },
  });

  const update = useCallback(
    (deviceToken: string, toggleValue: boolean) => {
      mutate({ deviceToken, toggleValue });
    },
    [mutate]
  );

  return {
    alarmOn: data?.data.alarmOn,
    updateAlarm: update,
  };
};
