import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.28.3/full/pyodide.mjs";

const pyodideReady = loadPyodide();

self.onmessage = async ({ data }) => {
  const { id, code } = data;
  try {
    const pyodide = await pyodideReady;
    await pyodide.loadPackagesFromImports(code);
    let stdout = "";
    let stderr = "";
    pyodide.setStdout({ batched: (text) => { stdout += `${text}\n`; } });
    pyodide.setStderr({ batched: (text) => { stderr += `${text}\n`; } });
    const result = await pyodide.runPythonAsync(code);
    const value = result == null ? "" : String(result);
    self.postMessage({ id, output: [stdout.trim(), value].filter(Boolean).join("\n"), error: stderr.trim() });
  } catch (error) {
    self.postMessage({ id, output: "", error: error instanceof Error ? error.message : String(error) });
  }
};
