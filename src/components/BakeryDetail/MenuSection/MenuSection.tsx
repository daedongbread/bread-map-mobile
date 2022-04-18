import React from 'react';
import { BakeryDetailTabScreenProps } from '@/router';
import { bindHook } from '@/utils';
import styled from '@emotion/native';
import { Menus } from '@shared/Menus';
import Divider from '../Divider';
import { TabHeader } from '../TabHeader';
import { useMenuSection } from './useMenuSection';

export type MenuItem = {
  name: string;
  price: number;
  rating: number;
};

const MenuSection: React.FC<BakeryDetailTabScreenProps<'BakeryDetailMenu'>> = bindHook(
  useMenuSection,
  ({ bakeryMenu }) => {
    return (
      <Container>
        <Divider />
        <TabHeader title={'메뉴'} totalCount={bakeryMenu.length} addBtnText={'메뉴 입력'} />
        <Content>
          <Menus bakeryMenu={bakeryMenu} />
        </Content>
      </Container>
    );
  }
);

export { MenuSection };

const Container = styled.View`
  background-color: white;
`;

const Content = styled.View`
  padding: 0 20px;
`;
