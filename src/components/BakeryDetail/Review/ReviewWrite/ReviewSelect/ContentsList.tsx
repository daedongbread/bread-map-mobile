import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { AddButton } from './AddButton';
import { AdditionalArea } from './AdditionalArea';
import { Bakery } from './Bakery';
import { NoDataRow } from './NoDataRow';

type Props = {
  bakerys: BakeryType[];
  selectedBakery: BakeryType[];
  onChangeSeledtedBakery: (bakery: BakeryType, value: boolean) => void;
};

export const ContentsList: React.FC<Props> = ({ bakerys, selectedBakery, onChangeSeledtedBakery }) => {
  const [isShowAddArea, setIsShowAddArea] = useState(false);
  const onPress = () => setIsShowAddArea(isBool => !isBool);

  return bakerys.length ? (
    <FlatList
      data={bakerys}
      renderItem={({ item, index }) => (
        <>
          <Bakery {...item} selectedBakery={selectedBakery} onChangeSeledtedBakery={onChangeSeledtedBakery} />
          {index === bakerys.length - 1 && (
            <>
              {isShowAddArea && <AdditionalArea onChangeSeledtedBakery={onChangeSeledtedBakery} />}
              <AddButton buttonText="메뉴 직접입력하기" onPress={onPress} />
            </>
          )}
        </>
      )}
    />
  ) : (
    <>
      <NoDataRow />
      <AddButton buttonText="메뉴 직접입력하기" onPress={onPress} />
    </>
  );
};
