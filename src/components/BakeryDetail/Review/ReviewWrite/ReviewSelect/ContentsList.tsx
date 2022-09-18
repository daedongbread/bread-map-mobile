import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { BreadEntity } from '@/apis/bread';
import { AddButton } from './AddButton';
import { AdditionalArea } from './AdditionalArea';
import { Bread } from './Bread';
import { NoDataRow } from './NoDataRow';

type Props = {
  breads: BreadEntity[];
  selectedBreads: BreadEntity[];
};

export const ContentsList: React.FC<Props> = ({ breads, selectedBreads }) => {
  const [isShowAddArea, setIsShowAddArea] = useState(false);
  const onPress = () => setIsShowAddArea(isBool => !isBool);

  return breads.length ? (
    <FlatList
      data={breads}
      renderItem={({ item, index }) => (
        <>
          <Bread {...item} selectedBreads={selectedBreads} />
          {index === breads.length - 1 && (
            <>
              {isShowAddArea && <AdditionalArea />}
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
