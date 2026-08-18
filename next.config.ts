import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "CMSpec";
const isAccountSite = repositoryName.toLowerCase().endsWith(".github.io");
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = isGitHubPages
  ? (configuredBasePath ?? (isAccountSite ? "" : `/${repositoryName}`))
  : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: { unoptimized: true },
        typescript: { ignoreBuildErrors: true },
      }
    : {}),
};

export default nextConfig;
