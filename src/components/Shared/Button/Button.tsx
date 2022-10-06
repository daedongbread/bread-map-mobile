import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from 'react-native';
import { theme } from '@/styles/theme';
import { PlusIcon } from '@shared/Icons';
import { Text } from '@shared/Text';

type Appearance = 'primary' | 'secondary' | 'terdary' | 'quaternary';
type Size = 'big' | 'large';

interface Props extends TouchableOpacityProps {
  style?: ViewProps['style'];
  appearance?: Appearance;
  size?: Size;
  icon?: boolean;
}

export const Button: React.FC<Props> = ({
  appearance = 'primary',
  size = 'large',
  style = {},
  icon,
  children,
  ...rest
}) => {
  const appearanceStyle = appearanceStyles[appearance];
  const textStyle = textStyles[appearance];
  const iconColor = iconStyles[appearance].color;
  const sizeStyle = sizeStyles[size];

  return (
    <View style={style}>
      <TouchableOpacity {...rest}>
        <View style={[appearanceStyle, sizeStyle, defaultStyles.common]}>
          {icon && <PlusIcon color={iconColor} style={defaultStyles.icon} />}
          <Text style={textStyle} presets={['body1', 'bold']}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  common: {
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
});

const appearanceStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.color.primary500,
  },
  secondary: {
    backgroundColor: theme.color.primary100,
  },
  terdary: {
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.gray300,
  },
  quaternary: {
    backgroundColor: theme.color.gray400,
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: theme.color.white,
  },
  secondary: {
    color: theme.color.primary500,
  },
  terdary: {
    color: theme.color.gray700,
  },
  quaternary: {
    color: theme.color.white,
  },
});

const iconStyles = StyleSheet.create({
  primary: {
    color: textStyles.primary.color,
  },
  secondary: {
    color: textStyles.secondary.color,
  },
  terdary: {
    color: theme.color.gray400,
  },
  quaternary: {
    color: textStyles.quaternary.color,
  },
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
});
