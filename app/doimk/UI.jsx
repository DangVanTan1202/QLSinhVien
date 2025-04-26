"use client";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordUI({
  oldPassword,
  newPassword,
  confirmPassword,
  showOld,
  showNew,
  showConfirm,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  setShowOld,
  setShowNew,
  setShowConfirm,
  handleSubmit,
  router,
  error,
  success,
}) {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 px-4">
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl relative border border-pink-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
           Đổi Mật Khẩu
        </h2>

        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* OLD PASSWORD */}
          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu cũ
            </label>
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              required
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-pink-500"
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu mới
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              required
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-purple-500"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6 relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Xác nhận mật khẩu mới
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-blue-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md"
          >
            Đổi Mật Khẩu
          </button>
        </form>

        <button
          onClick={() => router.back()}
          className="w-full py-2 mt-4 text-sm text-gray-600 underline hover:text-gray-900 text-center"
        >
           Quay lại
        </button>
      </div>
    </div>
  );
}
