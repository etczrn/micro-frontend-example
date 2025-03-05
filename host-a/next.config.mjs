const { SHARED_URL } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/foo',
        destination: `${SHARED_URL}/products`,
      },
      {
        source: '/shared/_next/static/:path*', // ✅ shared 모듈의 정적 파일을 가져올 수 있도록 프록시 설정
        destination: `${SHARED_URL}/_next/static/:path*`,
      },
    ];
  },
};

export default nextConfig;
