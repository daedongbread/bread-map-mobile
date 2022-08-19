import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ToggleCloseIcon } from '@/components/Shared/Icons/ToggleCloseIcon';
import { Text } from '@/components/Shared/Text';
import { BakeryType } from '@/containers/Review/ReviewSelectContainer';
import { theme } from '@/styles/theme';

interface Props {
  bakery: BakeryType;
  onChangeSeledtedBakery: (bakery: BakeryType, value: boolean) => void;
}

export const BakeryToggle = ({ bakery, onChangeSeledtedBakery }: Props) => {
  const [isTouched, setIsTouched] = useState(false);

  const onPressCloseButton = () => {
    onChangeSeledtedBakery(bakery, false);
  };

  const containerStyle = isTouched ? [styles.container, styles.touchedContainer] : styles.container;

  return (
    <TouchableOpacity style={containerStyle} onPress={() => setIsTouched(bool => !bool)}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bakeryNameText}>
        {bakery.name}
      </Text>
      {isTouched && (
        <TouchableOpacity style={styles.button} onPress={onPressCloseButton}>
          <ToggleCloseIcon />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.primary500,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },
  touchedContainer: {
    backgroundColor: theme.color.primary300,
  },
  bakeryNameText: {
    maxWidth: 120,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    marginLeft: 8,
    backgroundColor: '#ffffff',
    borderRadius: 100,
  },
});
