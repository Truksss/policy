"use client";

import { useState } from "react";
import { requestPolicyGeneration } from "@/lib/api";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { marked } from "marked";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, FileText, FileDown } from "lucide-react";

export default function PolicyGenerator() {
  const [school, setSchool] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [requirements, setRequirements] = useState("");
  const [scope, setScope] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[400px] p-6',
        style: 'line-height: 1.8; font-size: 16px;'
      }
    }
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await requestPolicyGeneration({
        school,
        country,
        level,
        requirements,
        scope: scope.split(",").map((s) => s.trim()),
      });
      const policy = res?.generated_policy || "No policy received";
      setResult(policy);

      const html = marked.parse(policy, { breaks: true });
      editor?.commands.setContent(html);
    } catch {
      setResult("Error generating policy");
      editor?.commands.setContent("<p>Error generating policy</p>");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (endpoint: string, filename: string) => {
    if (!editor) return;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: editor.getHTML(), filename }),
    });

    if (!res.ok) {
      alert("Export failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportPDF = () =>
    downloadFile("/api/export-pdf", `${school || "policy"}.pdf`);
  const exportDOCX = () =>
    downloadFile("/api/export-docx", `${school || "policy"}.docx`);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6 overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <motion.div
        className="relative max-w-4xl mx-auto space-y-6 z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="btn btn-outline">
            ← Back to Chat
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            AI Policy Generator
          </h1>
          <div />
        </div>

        {/* Input Form */}
        <motion.div
          className="space-y-4 card p-6 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-slate-700">
            School Information
          </h2>
          <input
            placeholder="School / Organization name"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="input"
          />
          <input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input"
          />
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="input"
          >
            <option value="">Select Level</option>
            <option value="primary">Primary</option>
            <option value="highschool">High School</option>
            <option value="university">University</option>
          </select>

          <h2 className="text-lg font-semibold text-slate-700">
            Policy Details
          </h2>
          <textarea
            placeholder="Special requirements (e.g., data privacy, AI ethics)"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="input"
          />
          <input
            placeholder="Scope (comma separated)"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="input"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !school.trim()}
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            {loading ? "Generating…" : "Generate Policy"}
          </button>
        </motion.div>

        {/* Policy Editor */}
        {result && editor && (
          <motion.div
            className="card p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl space-y-6"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-slate-700">
              Generated Policy
            </h2>

            {/* Export as beautiful cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                onClick={exportPDF}
                className="cursor-pointer flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 border rounded-xl shadow-sm transition"
              >
                <FileDown className="h-6 w-6 text-indigo-600" />
                <div>
                  <p className="font-semibold text-slate-800">Export as PDF</p>
                  <p className="text-sm text-slate-500">
                    Download your policy in PDF format
                  </p>
                </div>
              </div>
              <div
                onClick={exportDOCX}
                className="cursor-pointer flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border rounded-xl shadow-sm transition"
              >
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-slate-800">Export as DOCX</p>
                  <p className="text-sm text-slate-500">
                    Download your policy in Word format
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
              <style>{`
                .ProseMirror p { margin-bottom: 16px; }
                .ProseMirror h1 { margin-top: 24px; margin-bottom: 12px; font-size: 24px; font-weight: bold; }
                .ProseMirror h2 { margin-top: 20px; margin-bottom: 10px; font-size: 20px; font-weight: bold; }
                .ProseMirror h3 { margin-top: 16px; margin-bottom: 8px; font-size: 18px; font-weight: bold; }
                .ProseMirror strong { font-weight: 600; }
                .ProseMirror ul, .ProseMirror ol { margin: 16px 0; padding-left: 24px; }
                .ProseMirror li { margin-bottom: 8px; }
              `}</style>
              <EditorContent editor={editor} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}