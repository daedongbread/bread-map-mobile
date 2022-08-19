import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { theme } from '@/styles/theme';
import CheckBox from '@react-native-community/checkbox';

interface Props extends BakeryType {
  selectedBakery: BakeryType[];
  onChangeSeledtedBakery: (bakery: BakeryType, value: boolean) => void;
}

export const Bakery: React.FC<Props> = ({ selectedBakery, onChangeSeledtedBakery, ...bakery }) => {
  const isChecked = selectedBakery.some(item => item.id === bakery.id);
  const formattedBakeryPrice = bakery.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.bakeryName}>{bakery.name}</Text>
        <Text style={styles.bakeryPrice}>{formattedBakeryPrice}원</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image style={styles.bakeryImage} source={require('@/components/Shared/Images/bread.png')} />
        <View>
          <CheckBox
            style={styles.checkbox}
            tintColor={theme.color.gray400}
            onTintColor={theme.color.primary500}
            onFillColor={theme.color.primary500}
            onCheckColor={'white'}
            value={isChecked}
            onValueChange={value => {
              onChangeSeledtedBakery(bakery, value);
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
  bakeryName: {
    fontSize: 16,
    color: theme.color.gray900,
    fontWeight: '700',
  },
  bakeryPrice: {
    fontSize: 16,
    color: theme.color.primary500,
    fontWeight: '700',
    lineHeight: 22,
  },
  bakeryImage: {
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
