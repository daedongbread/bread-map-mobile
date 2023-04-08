import { useMutation } from 'react-query';
import { fetcher } from '../fetcher';
import { FlagColor } from './types';

type UseCreateFlagProps = {
  name: string;
  color: FlagColor;
};

const postFlag = ({ name, color }: UseCreateFlagProps) => {
  return fetcher.post<void>('/v1/flags', {
    name,
    color,
  });
};

const useCreateFlag = () => {
  return useMutation(['useMutationCreateFlag'], postFlag);
};

export { useCreateFlag };
