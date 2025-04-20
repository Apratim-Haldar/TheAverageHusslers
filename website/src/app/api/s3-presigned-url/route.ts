import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || ''
  }
});

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const fileName = searchParams.get('fileName');
  const fileType = searchParams.get('fileType');
  
  if (!fileName || !fileType) {
    return NextResponse.json(
      { error: 'Missing fileName or fileType parameters' },
      { status: 400 }
    );
  }

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET || 'genai-job-applications',
    Key: `resumes/${Date.now()}_${fileName}`,
    ContentType: fileType
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 300 });
    return NextResponse.json({ 
      url,
      key: command.input.Key 
    });
  } catch (error) {
    console.error('S3 Presigned URL Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}