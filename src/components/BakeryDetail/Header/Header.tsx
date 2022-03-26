import React from 'react';
import styled from '@emotion/native';
import { ChevronDownIcon, ShareIcon } from '@shared/Icons';

type HeaderProps = {
  bakeryName: string;
};

const Header: React.FC<HeaderProps> = ({ bakeryName }) => (
  <Container>
    <NameWithIcons>
      <HeaderIcon>
        <ChevronDownIcon />
      </HeaderIcon>
      <BakeryName>{bakeryName}</BakeryName>
      <HeaderIcon>
        <ShareIcon />
      </HeaderIcon>
    </NameWithIcons>
  </Container>
);

export { Header };

const Container = styled.View``;

const NameWithIcons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.color.gray100};
`;

const HeaderIcon = styled.View`
  padding: 12px;
`;

const BakeryName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
