"use client"
import { useCallback, useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import { EngineStatus, PdfTeXEngine } from "@/latex/PdfTeXEngine";

const engine = new PdfTeXEngine();

export default function Editor() {
    const [code, setCode] = useState('');
    const [ready, setReady] = useState(false);
    const [pdfObjectURL, setpdfObjectURL] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);

    const [previewScrollPosition, setPreviewScrollPosition] = useState<number>(0);

    useEffect(() => {
        engine.loadEngine().then(() => {
            console.log(engine.latexWorkerStatus)
            setReady(true)
        });
        return () => engine.closeWorker()
    }, []);


    const compileLatex = (code: string) => {
        setDirty(false);
        setLoading(true);
        try {

        
        engine.writeMemFSFile("main.tex", code);
        engine.setEngineMainFile("main.tex");
        engine.compileLaTeX().then((r) => {
            const buffer = r.pdf;
            if (buffer) {
                const file = new Blob([buffer], {type: 'application/pdf'});
                const fileUrl = URL.createObjectURL(file);
                setpdfObjectURL(fileUrl);
            }
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });        
    } catch (err) {
        console.log(err);
        setLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-2 gap-4 w-full">
            <div>
                <div className="mb-2 bg-gray-200 px-3 py-2 flex justify-between items-center">
                    Editor
                    <button type="button" onClick={(_) => compileLatex(code)} className="bg-[#4E3FDB] text-white px-3 py-2 disabled:bg-gray-400" disabled={!ready || !dirty || !code}>{loading? 'Compiling' : 'Compile'} </button>
                </div>
                <CodeEditor code={code} setCode={(code) => {setCode(code); setDirty(true);}} />
            </div>
            <div>
                <div className="mb-2 px-3 py-4 w-full bg-gray-200">PDF Preview</div>
                <Preview pdfObjectURL={pdfObjectURL} loading={loading} 
                previewScrollPosition={previewScrollPosition} setPreviewScrollPosition={setPreviewScrollPosition} />
            </div>
        </div>
    )
}