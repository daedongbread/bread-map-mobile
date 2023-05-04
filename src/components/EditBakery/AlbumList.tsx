import React, { useEffect, useState } from 'react';
import { FlatList, PermissionsAndroid, Platform } from 'react-native';
import { getRandomImageUrl } from '@/utils';
import { phPathToFilePath } from '@/utils/phPathToFilePath';
import { CameraRoll, GetPhotosParams, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { AlbumItem } from './AlbumItem';

export function AlbumList({ setCurLocationUrl }: any) {
  //스크롤 될 때마다 사진을 불러올 경우 현재의 갤러리를 어디까지 불러왔는지에 대한 저장 값
  const [galleryCursor, setGalleryCursor] = useState<string | undefined | null>(null);
  const [galleryList, setGalleryList] = useState<PhotoIdentifier[]>([]);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const getPhotoWithPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    getPhotos();
  };

  const getPhotos = async () => {
    const params: GetPhotosParams = {
      //이미지를 불러올 개수 (최신순으로)
      first: 50,
      assetType: 'Photos',
      ...(galleryCursor && { after: galleryCursor }),
    };

    try {
      //사진을 불러옵니다. edges는 gallery photo에 대한 정보
      const { edges, page_info } = await CameraRoll.getPhotos(params);

      if (page_info.has_next_page === false) {
        setGalleryCursor(null);
      } else {
        setGalleryCursor(page_info.end_cursor);
      }

      /*ios인 경우는 ph:// 형식으로 사진이 저장됩니다.
          이미지를 읽을 수 없는 오류가 생기기 때문에
          react-native-fs의 파일 시스템을 이용하여 변환 시켜줍니다.*/
      if (Platform.OS === 'ios') {
        for await (const item of edges) {
          const result = await phPathToFilePath(item.node.image.uri);
          item.node.image.uri = result;
        }
      }

      setGalleryList([...galleryList, ...edges]);
    } catch (error) {
      // console.log('[takeStore getPhotos error occured] ', error);
    }
  };

  useEffect(() => {
    getPhotoWithPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      bounces={false}
      numColumns={3}
      data={galleryList}
      renderItem={AlbumItem(setCurLocationUrl)}
      keyExtractor={(item, index) => index + ''}
      onEndReachedThreshold={0.7}
      onEndReached={getPhotos}
    />
  );
}

const data = [
  {
    index: 1,
    url: getRandomImageUrl(),
  },
  {
    index: 2,
    url: getRandomImageUrl(),
  },
  {
    index: 3,
    url: getRandomImageUrl(),
  },
  {
    index: 4,
    url: getRandomImageUrl(),
  },
  {
    index: 5,
    url: getRandomImageUrl(),
  },
  {
    index: 6,
    url: getRandomImageUrl(),
  },
  {
    index: 7,
    url: getRandomImageUrl(),
  },
  {
    index: 8,
    url: getRandomImageUrl(),
  },
  {
    index: 9,
    url: getRandomImageUrl(),
  },
  {
    index: 10,
    url: getRandomImageUrl(),
  },
  {
    index: 11,
    url: getRandomImageUrl(),
  },
  {
    index: 12,
    url: getRandomImageUrl(),
  },
  {
    index: 13,
    url: getRandomImageUrl(),
  },
  {
    index: 14,
    url: getRandomImageUrl(),
  },
  {
    index: 15,
    url: getRandomImageUrl(),
  },
  {
    index: 16,
    url: getRandomImageUrl(),
  },
  {
    index: 17,
    url: getRandomImageUrl(),
  },
  {
    index: 18,
    url: getRandomImageUrl(),
  },
  {
    index: 19,
    url: getRandomImageUrl(),
  },
  {
    index: 20,
    url: getRandomImageUrl(),
  },
  {
    index: 21,
    url: getRandomImageUrl(),
  },
  {
    index: 22,
    url: getRandomImageUrl(),
  },
  {
    index: 23,
    url: getRandomImageUrl(),
  },
  {
    index: 24,
    url: getRandomImageUrl(),
  },
];
