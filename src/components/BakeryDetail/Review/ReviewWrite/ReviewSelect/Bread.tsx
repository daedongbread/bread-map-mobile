import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BreadEntity } from '@/apis/bread';
import { useAppDispatch } from '@/hooks/redux';
import { updateSelectedBread } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';
import CheckBox from '@react-native-community/checkbox';

interface Props extends BreadEntity {
  selectedBreads: BreadEntity[];
}

export const Bread: React.FC<Props> = ({ selectedBreads, ...bread }) => {
  const dispatch = useAppDispatch();

  const isChecked = selectedBreads.some(item => item.id === bread.id);
  const formattedBreadPrice = bread.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.breadName}>{bread.name}</Text>
        <Text style={styles.breadPrice}>{formattedBreadPrice}원</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image style={styles.breadImage} source={require('@/components/Shared/Images/bread.png')} />
        <View>
          <CheckBox
            style={styles.checkbox}
            animationDuration={0}
            tintColor={theme.color.gray400}
            onTintColor={theme.color.primary500}
            onFillColor={theme.color.primary500}
            onCheckColor={'white'}
            value={isChecked}
            onValueChange={value => {
              dispatch(updateSelectedBread({ bread, value }));
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eeeeee',
  },
  leftContainer: {
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  breadName: {
    fontSize: 16,
    color: theme.color.gray900,
    fontWeight: '700',
  },
  breadPrice: {
    fontSize: 16,
    color: theme.color.primary500,
    fontWeight: '700',
    lineHeight: 22,
  },
  breadImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    marginHorizontal: 2,
  },
});
