// const OSS = require('ali-oss');
import OSS from 'ali-oss';
import { serverEnvs } from '@/utils';

export const client = new OSS({
  region: serverEnvs.OSS_ENDPOINT,
  accessKeyId: serverEnvs.OSS_ACCESS_KEY_ID,
  accessKeySecret: serverEnvs.OSS_ACCESS_KEY_SECRET,
  bucket: serverEnvs.OSS_BUCKET_NAME,
});

export function upload2Oss(fileName: string, buffer: any) {
  const excutor = async (resolve: any, reject: any) => {
    const headers = {
      // 指定Object的存储类型。
      'x-oss-storage-class': 'Standard',
      // 指定Object的访问权限。
      'x-oss-object-acl': 'private',
      // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
      'Content-Disposition': `attachment; filename="${fileName}"`,
      // 指定PutObject操作时是否覆盖同名目标Object。true，表示禁止覆盖同名Object。
      'x-oss-forbid-overwrite': 'false',
      'content-type': 'audio/mp3',
    };

    try {
      // 上传文件到OSS，'object'是OSS中的文件名，'localfile'是本地文件的路径。
      const uploadResult = await client.put(fileName, buffer, { headers });
      const filename = uploadResult.name;
      console.log('⛅️ ~ upload to oss success ~ :', filename);
      // 从OSS下载文件以验证上传成功。
      // const getResult = await client.get(fileName, {
      //   'content-type': 'audio/mp3',
      // });
      // console.log('获取文件成功:', getResult);

      return resolve(uploadResult);
    } catch (error) {
      console.error('发生错误:', error);
      return reject(error);
    }
  };
  return new Promise(excutor);
}
