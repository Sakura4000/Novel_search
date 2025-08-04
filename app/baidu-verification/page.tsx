export default function BaiduVerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          百度站点验证
        </h1>
        <p className="text-gray-600 mb-4">
          此页面用于百度API申请的站点验证
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-2">验证代码：</p>
          <code className="bg-gray-100 px-3 py-2 rounded text-sm">
            codeva-L0W9rpGXWM
          </code>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          验证完成后可以删除此页面
        </p>
      </div>
    </div>
  )
} 