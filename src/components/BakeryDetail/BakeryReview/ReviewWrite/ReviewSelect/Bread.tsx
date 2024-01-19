import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MenuForReviewEntity } from '@/apis/menu/type';
import { CustomCheckBox } from '@/components/Shared/Chcekbox/CustomCheckBox';
import { useAppDispatch } from '@/hooks/redux';
import { updateSelectedBread } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';

interface Props extends MenuForReviewEntity {
  selectedBreads: MenuForReviewEntity[];
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
        {bread.image ? (
          <Image style={styles.breadImage} source={{ uri: bread.image }} />
        ) : (
          <View style={styles.breadImage} />
        )}

        <View>
          <CustomCheckBox
            strokeWidth={2}
            value={isChecked}
            onValueChange={value => {
              dispatch(updateSelectedBread({ bread, isChecked: value }));
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
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
});
