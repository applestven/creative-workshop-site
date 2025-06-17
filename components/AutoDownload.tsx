import { useEffect, useState } from "react";

export default function AutoDownload() {
  const [platform, setPlatform] = useState<"windows" | "macos" | "linux" | "unknown">("unknown");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("windows")) {
      setPlatform("windows");
      setUrl("http://43.139.236.50/update/windows/videoP-0.1.2-arm64.exe");
    } else if (ua.includes("mac os") || ua.includes("macintosh")) {
      setPlatform("macos");
      setUrl("http://43.139.236.50/update/macos/Inspiro-Setup-0.1.3.dmg");
    } else if (ua.includes("linux")) {
      setPlatform("linux");
      setUrl("http://43.139.236.50/update/linux/videoP-0.1.2-arm64.AppImage");
    } else {
      setPlatform("unknown");
      setUrl("");
    }
  }, []);

  if (platform === "unknown") {
    return <p>无法检测你的操作系统，请手动选择下载。</p>;
  }

  return (
    <a
      href={url}
      className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
      download
    >
      为你的 {platform.toUpperCase()} 下载最新版本
    </a>
  );
}
