import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '@/styles/theme';
import { CustomImage } from '../CustomImage';
import { BreadRating } from '../Rating';

type MenuProps = {
  name: string;
  price: string;
  rating: number;
  reviewNum: number;
  image?: string | null;
};

const Menu: React.FC<MenuProps> = ({ name, price, rating, reviewNum, image }) => {
  const formattedPrice = Number(price) ? `${Number(price).toLocaleString()}원` : price;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <BreadRating type={'menu'} rating={rating} reviewLength={reviewNum} />
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
      {image ? (
        <CustomImage
          style={styles.image}
          source={{ uri: image }}
          width={styles.image.width}
          height={styles.image.height}
          resizedWidth={100}
          resizedHeight={100}
          isResizable
        />
      ) : (
        <View style={styles.image} />
      )}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: theme.color.black,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 16,
    color: theme.color.primary500,
  },
});

export { Menu };
