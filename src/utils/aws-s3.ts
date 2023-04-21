import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadFile(file: Express.Multer.File, folderName: string) {
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: `${folderName}/${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
    };

    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }
}
