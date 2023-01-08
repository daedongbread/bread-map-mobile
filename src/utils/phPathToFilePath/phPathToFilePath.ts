import RNFS from 'react-native-fs';

export const phPathToFilePath = async (uri: string) => {
  let fileURI = encodeURI(uri);

  if (uri.startsWith('ph://')) {
    const copyPath = `${RNFS.DocumentDirectoryPath}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');

    // ph경로의 이미지를 file로 옮기는 작업
    fileURI = await RNFS.copyAssetsFileIOS(uri, copyPath, 360, 360);
  }

  return fileURI;
};
