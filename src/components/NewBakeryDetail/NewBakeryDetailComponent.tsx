import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewBakery } from '@/apis/bakery/useGetNewBakeries';
import { NewBakeryCard } from '../Home/NewBakery/NewBakeryCard';
import { Header } from '../Shared/Header';
import { ScrollView } from '../Shared/View';

type Props = {
  newBakeries: NewBakery[];
};

export const NewBakeryDetailComponent = ({ newBakeries }: Props) => {
  return (
    <ScrollView>
      <SafeAreaView>
        <Header title="새로 등록된 신상 빵집" isPrevButtonShown />

        {newBakeries.map((item, index) => {
          return <NewBakeryCard key={item.id} isFirst={index === 0} newBakery={item} />;
        })}
      </SafeAreaView>
    </ScrollView>
  );
};
