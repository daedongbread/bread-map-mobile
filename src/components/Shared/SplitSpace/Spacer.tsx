import { theme } from '@/styles/theme';
import styled from '@emotion/native';

export const Spacer = styled.View<{ height: number }>`
  background-color: ${theme.color.gray100};
  height: 12px;
`;
