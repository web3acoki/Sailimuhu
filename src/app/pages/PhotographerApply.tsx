import { ChevronLeft, Upload, Camera, Award, FileText, Check, X, Scan } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

type FaceVerificationStatus = "pending" | "scanning" | "success" | "failed" | null;

export function PhotographerApply() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    realName: "",
    phone: "",
    wechat: "",
    specialty: [] as string[],
    experience: "",
    bio: "",
    idCardFront: "",
    idCardBack: "",
    portfolios: [] as string[]
  });
  const [faceVerificationStatus, setFaceVerificationStatus] = useState<FaceVerificationStatus>(null);
  const [showFaceScanner, setShowFaceScanner] = useState(false);

  const specialties = [
    "风光摄影", "人像写真", "民族服饰", "蓝冰拍摄",
    "天鹅生态", "星空摄影", "婚纱旅拍", "亲子摄影"
  ];

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialty: prev.specialty.includes(specialty)
        ? prev.specialty.filter(s => s !== specialty)
        : [...prev.specialty, specialty]
    }));
  };

  const startFaceVerification = () => {
    setShowFaceScanner(true);
    setFaceVerificationStatus("pending");

    // 模拟人脸识别流程
    setTimeout(() => {
      setFaceVerificationStatus("scanning");
    }, 500);

    setTimeout(() => {
      setFaceVerificationStatus("success");
      setTimeout(() => {
        setShowFaceScanner(false);
      }, 1500);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (faceVerificationStatus !== "success") {
      alert("请先完成人脸识别验证");
      return;
    }

    // Submit application logic here
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">摄影师入驻申请</h1>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-primary to-accent px-5 py-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">加入赛湖镜界</h2>
            <p className="text-sm opacity-90">开启你的专业摄影师之路</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <div>
            <div className="text-xl font-bold">10000+</div>
            <div className="text-xs opacity-80 mt-1">活跃用户</div>
          </div>
          <div>
            <div className="text-xl font-bold">500+</div>
            <div className="text-xs opacity-80 mt-1">认证摄影师</div>
          </div>
          <div>
            <div className="text-xl font-bold">¥8000</div>
            <div className="text-xs opacity-80 mt-1">月均收入</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="bg-white mt-3 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-4">基本信息</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">真实姓名 *</label>
              <input
                type="text"
                value={formData.realName}
                onChange={(e) => setFormData(prev => ({ ...prev, realName: e.target.value }))}
                placeholder="请输入真实姓名"
                required
                className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-2">手机号码 *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="请输入手机号码"
                required
                className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-2">微信号</label>
              <input
                type="text"
                value={formData.wechat}
                onChange={(e) => setFormData(prev => ({ ...prev, wechat: e.target.value }))}
                placeholder="请输入微信号"
                className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Specialty */}
        <div className="bg-white mt-3 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">擅长领域 *</h3>
          <div className="flex flex-wrap gap-2">
            {specialties.map(specialty => (
              <button
                key={specialty}
                type="button"
                onClick={() => toggleSpecialty(specialty)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  formData.specialty.includes(specialty)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white mt-3 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-4">从业经验 *</h3>
          <select
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            required
            className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">请选择从业年限</option>
            <option value="1">1年以下</option>
            <option value="1-3">1-3年</option>
            <option value="3-5">3-5年</option>
            <option value="5+">5年以上</option>
          </select>
        </div>

        {/* Bio */}
        <div className="bg-white mt-3 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">个人简介 *</h3>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="介绍一下你的摄影风格和经历吧~"
            required
            className="w-full h-32 p-3 bg-gray-50 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* ID Card */}
        <div className="bg-white mt-3 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">身份认证 *</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="aspect-[3/2] bg-gray-50 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 border-2 border-dashed border-gray-200"
            >
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-xs">身份证正面</span>
            </button>
            <button
              type="button"
              className="aspect-[3/2] bg-gray-50 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 border-2 border-dashed border-gray-200"
            >
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-xs">身份证反面</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">请上传清晰的身份证照片,信息仅用于认证</p>
        </div>

        {/* Face Verification */}
        <div className="bg-white mt-3 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Scan className="w-4 h-4 text-primary" />
            人脸识别验证 *
          </h3>

          {faceVerificationStatus === null && (
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <p className="text-sm text-gray-600 mb-4">请完成人脸识别以验证身份信息</p>
              <button
                type="button"
                onClick={startFaceVerification}
                className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 inline-flex items-center gap-2"
              >
                <Scan className="w-4 h-4" />
                开始识别
              </button>
            </div>
          )}

          {faceVerificationStatus === "success" && (
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <p className="text-sm font-medium text-green-600 mb-1">识别成功</p>
              <p className="text-xs text-gray-500">人脸信息已通过验证</p>
            </div>
          )}

          {faceVerificationStatus === "failed" && (
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                <X className="w-10 h-10 text-red-500" />
              </div>
              <p className="text-sm font-medium text-red-600 mb-1">识别失败</p>
              <p className="text-xs text-gray-500 mb-4">请确保光线充足,正对摄像头</p>
              <button
                type="button"
                onClick={startFaceVerification}
                className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90"
              >
                重新识别
              </button>
            </div>
          )}

          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-xs font-medium text-blue-800 mb-2 flex items-center gap-1">
              <FileText className="w-3 h-3" />
              温馨提示
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 请在光线充足的环境下进行人脸识别</li>
              <li>• 请摘下眼镜、帽子等遮挡物</li>
              <li>• 保持面部正对摄像头</li>
              <li>• 识别过程中请勿移动</li>
            </ul>
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white mt-3 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">作品展示 *</h3>
          <div className="grid grid-cols-3 gap-2">
            {formData.portfolios.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                <img src={img} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {formData.portfolios.length < 9 && (
              <button
                type="button"
                className="aspect-square bg-gray-50 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 border-2 border-dashed border-gray-200"
              >
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs">上传作品</span>
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-2">请上传3-9张代表作品,展示你的摄影风格</p>
        </div>

        {/* Agreement */}
        <div className="px-5 mt-4">
          <label className="flex items-start gap-2 text-xs text-gray-600">
            <input type="checkbox" required className="mt-0.5" />
            <span>
              我已阅读并同意
              <a href="#" className="text-primary">《摄影师入驻协议》</a>
              和
              <a href="#" className="text-primary">《服务规范》</a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3">
          <button
            type="submit"
            disabled={faceVerificationStatus !== "success"}
            className="w-full py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {faceVerificationStatus !== "success" && (
              <span className="text-xs">(需完成人脸识别)</span>
            )}
            提交申请
          </button>
        </div>
      </form>

      {/* Face Scanner Modal */}
      {showFaceScanner && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-sm mx-auto px-5">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">人脸识别</h3>
              <p className="text-sm text-white/80">
                {faceVerificationStatus === "pending" && "请将面部置于识别框内"}
                {faceVerificationStatus === "scanning" && "正在识别中,请保持不动..."}
                {faceVerificationStatus === "success" && "识别成功!"}
              </p>
            </div>

            {/* Face Detection Frame */}
            <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-6">
              {/* Camera Preview Simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />

              {/* Face Detection Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`relative w-64 h-80 rounded-full border-4 transition-all duration-500 ${
                  faceVerificationStatus === "scanning"
                    ? "border-primary animate-pulse"
                    : faceVerificationStatus === "success"
                    ? "border-green-500"
                    : "border-white/50"
                }`}>
                  {/* Corner Markers */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />

                  {/* Scanning Line */}
                  {faceVerificationStatus === "scanning" && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                    </div>
                  )}

                  {/* Success Icon */}
                  {faceVerificationStatus === "success" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                        <Check className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Indicators */}
              {faceVerificationStatus === "scanning" && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>

            {/* Progress Info */}
            <div className="text-center">
              {faceVerificationStatus === "scanning" && (
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                  <p className="text-sm text-white font-medium">识别进度: 85%</p>
                </div>
              )}
            </div>

            {/* Cancel Button */}
            {faceVerificationStatus === "pending" && (
              <button
                onClick={() => {
                  setShowFaceScanner(false);
                  setFaceVerificationStatus(null);
                }}
                className="mt-6 w-full py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/30"
              >
                取消
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes scale-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
