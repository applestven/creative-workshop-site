// pages/index.tsx
import Head from "next/head";
import { useEffect, useState } from "react";
import { Laptop2, Apple, Cpu, DownloadCloud,Sparkles,MonitorPlay } from "lucide-react";
import Footer from "../components/Footer";

// 这在/api/get-update-url 读取yml文件失败的时候会起作用
const VERSION = "0.1.4";

type DownloadLinks = {
  windows: string;
  macIntel: string;
  macArm: string;
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function Home() {
  const [downloadLinks, setDownloadLinks] = useState<DownloadLinks>({
    windows: `https://update.itclass.top/update/windows/Inspiro-Setup-${VERSION}.exe`,
    macIntel: `https://update.itclass.top/update/macos/Inspiro-Setup-${VERSION}.dmg`,
    macArm: `https://update.itclass.top/update/macos/Inspiro-Setup-${VERSION}.dmg`,
  });

  useEffect(() => {
    fetch("/api/get-update-url")
      .then((res) => res.json())
      .then((data) => {
        if (data.windows?.url && data.macos?.url) {
          setDownloadLinks({
            windows: `https://update.itclass.top/update/windows/${data.windows.url}`,
            macIntel: `https://update.itclass.top/update/macos/${data.macos.url}`,
            macArm: `https://update.itclass.top/update/macos/${data.macos.url}`,
          });
        }
      })
      .catch(() => {
        // 请求失败时保持默认链接
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FF] text-gray-900">
      <Head>
        <title>创意工坊 - 一键音视频处理</title>
        <meta
          name="description"
          content="创意工坊：一键剪辑、加字幕、转音频的音视频处理工具"
        />
      </Head>

      <header className="py-16 text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 animate-fade-in">
          创意工坊
        </h1>
        <p className="text-lg text-gray-600">一键音视频处理工具，轻松创作，快速分享</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 flex-grow">
        <section className="bg-[#E9EDFC] rounded-3xl shadow-xl p-10">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">立即下载</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <DownloadCard
              title="Windows 版"
              icon={<Laptop2 className="text-blue-600 w-8 h-8" />}
              description="适用于 Win 10 / 11"
              link={downloadLinks.windows}
            />
            <DownloadCard
              title="Mac 版（Intel 芯片）"
              icon={<Apple className="text-gray-800 w-8 h-8" />}
              description="适用于 Intel Mac"
              link={downloadLinks.macIntel}
            />
            <DownloadCard
              title="Mac 版（Apple 芯片）"
              icon={<Cpu className="text-green-600 w-8 h-8" />}
              description="适用于 M1 / M2 / M3 / M4"
              link={downloadLinks.macArm}
            />
          </div>
        </section>

        {/* 功能亮点 */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="text-indigo-500 w-8 h-8" />}
            title="一键智能处理"
            description="自动剪辑、转码、加字幕，操作极简，效率倍增"
          />
          <FeatureCard
            icon={<MonitorPlay className="text-purple-600 w-8 h-8" />}
            title="高品质输出"
            description="支持4K高清导出，无水印，画质稳定"
          />
          <FeatureCard
            icon={<DownloadCloud className="text-blue-500 w-8 h-8" />}
            title="多平台支持"
            description="兼容 Windows、macOS 多芯片架构"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function DownloadCard({
  title,
  icon,
  description,
  link,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
    >
      <div className="mb-2 flex justify-center">{icon}</div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <span className="text-blue-600 font-semibold inline-flex items-center gap-1">
        <DownloadCloud className="w-4 h-4" /> 下载
      </span>
    </a>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
      <div className="mb-3 flex justify-center">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}