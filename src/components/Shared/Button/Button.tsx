import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from 'react-native';
import IcAlbum from '@/components/Shared/Icons/IcAlbum.svg';
import IcCameraGray from '@/components/Shared/Icons/IcCameraGray.svg';
import { theme } from '@/styles/theme';
import { PlusIcon } from '@shared/Icons';
import { Text } from '@shared/Text';
import { TextPresets } from '../Text/presets';

type Appearance = 'primary' | 'secondary' | 'terdary' | 'quaternary' | 'quinary';
type Size = 'big' | 'large' | 'tiny';

interface Props extends TouchableOpacityProps {
  style?: ViewProps['style'];
  presets?: TextPresets | Array<TextPresets>;
  appearance?: Appearance;
  size?: Size;
  icon?: boolean;
  cameraIcon?: boolean;
  albumIcon?: boolean;
  borderRadius?: number;
  disabled: boolean;
}

export const Button: React.FC<Props> = ({
  appearance = 'primary',
  presets = ['body1', 'bold'],
  size = 'large',
  style = {},
  icon,
  cameraIcon,
  albumIcon,
  children,
  borderRadius = 8,
  disabled,
  ...rest
}) => {
  const appearanceStyle = appearanceStyles(disabled)[appearance].wrapper;
  const textStyle = appearanceStyles(disabled)[appearance].text;
  const iconColor = appearanceStyles(disabled)[appearance].icon.color;
  const sizeStyle = sizeStyles[size];

  const defaultStyles = StyleSheet.create({
    common: {
      flexDirection: 'row',
      borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginRight: 6,
    },
  });

  return (
    <View style={style}>
      <TouchableOpacity {...rest}>
        <View style={[appearanceStyle, sizeStyle, defaultStyles.common]}>
          {icon && <PlusIcon color={iconColor} style={defaultStyles.icon} />}
          {cameraIcon && <IcCameraGray style={defaultStyles.icon} />}
          {albumIcon && <IcAlbum style={defaultStyles.icon} />}
          <Text style={textStyle} presets={presets}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const appearanceStyles = (disabled = false) => ({
  primary: StyleSheet.create({
    wrapper: {
      backgroundColor: disabled ? theme.color.primary200 : theme.color.primary500,
    },
    text: {
      color: theme.color.white,
    },
    icon: {
      color: theme.color.white,
    },
  }),
  secondary: StyleSheet.create({
    wrapper: {
      backgroundColor: theme.color.primary100,
    },
    text: {
      color: theme.color.primary500,
    },
    icon: {
      color: theme.color.primary500,
    },
  }),
  terdary: StyleSheet.create({
    wrapper: {
      backgroundColor: theme.color.white,
      borderWidth: 1,
      borderColor: theme.color.gray300,
    },
    text: {
      color: theme.color.gray700,
    },
    icon: {
      color: theme.color.gray400,
    },
  }),
  quaternary: StyleSheet.create({
    wrapper: {
      backgroundColor: theme.color.gray400,
    },
    text: {
      color: theme.color.white,
    },
    icon: {
      color: theme.color.white,
    },
  }),
  quinary: StyleSheet.create({
    wrapper: {
      backgroundColor: theme.color.primary200,
    },
    text: {
      color: theme.color.white,
    },
    icon: {
      color: theme.color.white,
    },
  }),
});

const sizeStyles = StyleSheet.create({
  big: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  large: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tiny: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
});
