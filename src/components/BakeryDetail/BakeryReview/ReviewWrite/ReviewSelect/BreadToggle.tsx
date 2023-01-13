import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ToggleCloseIcon } from '@/components/Shared/Icons/ToggleCloseIcon';
import { Text } from '@/components/Shared/Text';
import { useAppDispatch } from '@/hooks/redux';
import { deleteManualSelectedBread, RatedBread, updateSelectedBread } from '@/slices/reviewWrite';
import { theme } from '@/styles/theme';

interface Props {
  bread: RatedBread;
}

export const BreadToggle = ({ bread }: Props) => {
  const dispatch = useAppDispatch();
  const [isTouched, setIsTouched] = useState(false);

  const onPressCloseButton = () => {
    if (bread.type === 'manual') {
      dispatch(deleteManualSelectedBread({ id: bread.id }));
    } else {
      dispatch(
        updateSelectedBread({
          bread,
          isChecked: false,
        })
      );
    }
  };

  const containerStyle = isTouched ? [styles.container, styles.touchedContainer] : styles.container;

  return (
    <TouchableOpacity style={containerStyle} onPress={() => setIsTouched(bool => !bool)}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.breadNameText}>
        {bread.name}
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
  breadNameText: {
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
