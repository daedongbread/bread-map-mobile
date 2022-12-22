import React, { Dispatch, SetStateAction } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { BreadEntity } from '@/apis/bread';
import { RatedBread } from '@/slices/reviewWrite';
import { AddButton } from './AddButton';
import { Bread } from './Bread';
import { ManualInputRow } from './ManualInputRow';
import { NoDataRow } from './NoDataRow';

type Props = {
  breads: BreadEntity[];
  selectedBreads: BreadEntity[];
  manualInputs: BreadEntity[];
  setManualInputs: Dispatch<SetStateAction<RatedBread[]>>;
  isExistBread: (manualBreadName: string) => boolean;
};

type BreadListProps = {
  breads: BreadEntity[];
  selectedBreads: BreadEntity[];
};

type ManualBreadListProps = {
  manualInputs: BreadEntity[];
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

const ManualBreadList = ({ manualInputs, setManualInputs, isExistBread }: ManualBreadListProps) => {
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
          />
        );
      })}
    </>
  );
};

export const ContentsList: React.FC<Props> = ({
  breads,
  selectedBreads,
  manualInputs,
  setManualInputs,
  isExistBread,
}) => {
  const onPress = () => {
    const newManualInputs = [...manualInputs];
    newManualInputs.push({ id: newManualInputs.length + 1, name: '' });

    setManualInputs(newManualInputs);
  };

  return (
    <ScrollView>
      {breads.length || manualInputs.length ? (
        <BreadList breads={breads} selectedBreads={selectedBreads} />
      ) : (
        <NoDataRow />
      )}
      <ManualBreadList manualInputs={manualInputs} setManualInputs={setManualInputs} isExistBread={isExistBread} />
      <AddButton buttonText="메뉴 직접입력하기" onPress={onPress} />
    </ScrollView>
  );
};
