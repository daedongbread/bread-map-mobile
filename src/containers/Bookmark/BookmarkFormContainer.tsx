import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useQueryClient } from 'react-query';
import { fetcher } from '@/apis/fetcher';
import { useCreateFlag, FlagColor } from '@/apis/flag';
import { BookmarkForm } from '@/components/BookmarkForm';
import { FlagColors } from '@/components/Profile/ProfileComponent';
import { Button } from '@/components/Shared/Button/Button';
import { Header } from '@/components/Shared/Header';
import { MainStackScreenProps } from '@/pages/MainStack/Stack';
import { theme } from '@/styles/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

type ScreenProps = MainStackScreenProps<'Bookmark'>;
type Navigation = ScreenProps['navigation'];
type Route = ScreenProps['route'];

export const flagColorHexColors: Record<Exclude<FlagColor, 'ORANGE'>, typeof flagColors[number]> &
  Record<'ORANGE', '#ff6e40'> = {
  GRAY: theme.color.gray600,
  ORANGE: '#ff6e40',
  GREEN: '#1EC780',
  YELLOW: '#FFBF1B',
  CYAN: '#00C7D3',
  BLUE: '#1A73E9',
  SKY: '#50A0FF',
  NAVY: '#7B61FF',
  PURPLE: '#AD44FF',
  RED: '#FF4141',
  PINK: '#FF7294',
};

export const flagColors = [
  theme.color.gray600,
  '#FF6E40',
  '#1EC780',
  '#FFBF1B',
  '#00C7D3',
  '#1A73E9',
  '#50A0FF',
  '#7B61FF',
  '#AD44FF',
  '#FF4141',
  '#FF7294',
] as const;

const convertFlagColors = (color: typeof flagColors[number]): FlagColor => {
  return Object.entries(flagColorHexColors).find(([_, hex]) => hex === color)![0] as FlagColor;
};

export const BookmarkFormContainer: React.VFC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigation<Navigation>();
  const route = useRoute<Route>();

  const { mutate: createFlagMutate, isSuccess } = useCreateFlag();

  const [name, setName] = useState<string>(route.params?.name || '');
  const [color, setColor] = useState<typeof flagColors[number]>(() => {
    let defaultColor: typeof flagColors[number] = '#1EC780';

    if (route.params?.color) {
      defaultColor = FlagColors[route.params.color as keyof typeof FlagColors];
    }

    return defaultColor || '#1EC780';
  });

  const onChange = useCallback(({ name: label, value }) => {
    const changeFunctions = {
      name: setName,
      color: setColor,
    };

    if (label in changeFunctions) {
      changeFunctions[label as keyof typeof changeFunctions](value);
    }
  }, []);

  const onSave = useCallback(() => {
    if (route.params?.name) {
      fetcher
        .patch(`/v1/flags/${route.params?.flagId}`, {
          name: name,
          color: convertFlagColors(color),
        })
        .then(res => {
          if (res.status === 204) {
            queryClient.refetchQueries(['useGetFlag']);
            queryClient.refetchQueries(['useGetFlag', route.params?.flagId]);
            navigate.pop();
          }
        });
    } else {
      createFlagMutate({ name, color: convertFlagColors(color) });
    }
  }, [color, createFlagMutate, name, route, navigate, queryClient]);

  const onClose = useCallback(() => {
    navigate.pop();
  }, [navigate]);

  const disabledButton = !name.length || !color.length;

  useEffect(() => {
    if (isSuccess) {
      navigate.pop();
    }
  }, [isSuccess, navigate]);

  return (
    <SafeAreaView style={styles.container}>
      <Header isPrevButtonShown title={route.params?.name ? route.params?.name : '새 리스트'} />
      <BookmarkForm name={name} color={color} onChange={onChange} />
      <View style={styles.buttonInputContainer}>
        <View style={styles.fullScreen}>
          <Button appearance={'terdary'} onPress={onClose}>
            취소
          </Button>
        </View>
        <View style={styles.gap} />
        <View style={styles.fullScreen}>
          <Button disabled={disabledButton} onPress={onSave}>
            {route.params?.name ? '수정' : '완료'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  buttonInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  gap: {
    width: 8,
  },
});
