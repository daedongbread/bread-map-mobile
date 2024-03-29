import React, { Dispatch, SetStateAction } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { MenuForReviewEntity } from '@/apis/menu/type';
import { SplitRow } from '@/components/Shared/SplitSpace';
import { RatedBread } from '@/slices/reviewWrite';
import { AddButton } from './AddButton';
import { Bread } from './Bread';
import { ManualInputRow } from './ManualInputRow';
import { NoDataRow } from './NoDataRow';

type Props = {
  breads: MenuForReviewEntity[];
  selectedBreads: RatedBread[];
  manualSelectedBreads: RatedBread[];
  manualInputs: RatedBread[];
  setManualInputs: Dispatch<SetStateAction<RatedBread[]>>;
  isExistBread: (manualBreadName: string) => boolean;
};

type BreadListProps = {
  breads: MenuForReviewEntity[];
  selectedBreads: MenuForReviewEntity[];
};

type ManualBreadListProps = {
  manualSelectedBreads: RatedBread[];
  manualInputs: MenuForReviewEntity[];
  setManualInputs: Dispatch<SetStateAction<RatedBread[]>>;
  isExistBread: (manualBreadName: string) => boolean;
};

const BreadList = ({ breads, selectedBreads }: BreadListProps) => {
  return (
    <>
      {breads.map(item => {
        return <Bread key={item.id} {...item} selectedBreads={selectedBreads} />;
      })}
    </>
  );
};

const ManualBreadList = ({
  manualSelectedBreads,
  manualInputs,
  setManualInputs,
  isExistBread,
}: ManualBreadListProps) => {
  return (
    <>
      {manualInputs.map((item, idx) => {
        return (
          <ManualInputRow
            key={idx}
            id={idx}
            name={item.name}
            price={item.price}
            setManualInputs={setManualInputs}
            isExistBread={isExistBread}
            manualSelectedBreads={manualSelectedBreads}
          />
        );
      })}
    </>
  );
};

export const ContentsList: React.FC<Props> = ({
  breads,
  selectedBreads,
  manualSelectedBreads,
  manualInputs,
  setManualInputs,
  isExistBread,
}) => {
  const onPress = () => {
    const newManualInputs = [...manualInputs];
    newManualInputs.push({ id: newManualInputs.length + 1, name: '', type: 'manual' });

    setManualInputs(newManualInputs);
  };

  return (
    <ScrollView>
      {breads.length || manualInputs.length ? (
        <BreadList breads={breads} selectedBreads={selectedBreads} />
      ) : (
        <NoDataRow />
      )}
      <ManualBreadList
        manualSelectedBreads={manualSelectedBreads}
        manualInputs={manualInputs}
        setManualInputs={setManualInputs}
        isExistBread={isExistBread}
      />

      <SplitRow height={16} />
      <AddButton buttonText="메뉴 직접입력하기" onPress={onPress} />
      <SplitRow height={16} />
    </ScrollView>
  );
};
