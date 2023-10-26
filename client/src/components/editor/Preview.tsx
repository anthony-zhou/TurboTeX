import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

type PreviewProps = {
    pdfObjectURL: string
    loading: boolean
    previewScrollPosition: number
    setPreviewScrollPosition: Dispatch<SetStateAction<number>>
}

const maxWidth = 800;

export default function Preview({pdfObjectURL, loading, previewScrollPosition, setPreviewScrollPosition}: PreviewProps) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>();  

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
      setNumPages(numPages);
     
        setTimeout(() => {
          if (containerRef.current && previewScrollPosition !== 0) {
          containerRef.current.scrollTop = previewScrollPosition
          }
      }, 200)
      
    }

    const onScroll = (e: React.UIEvent<HTMLElement>) => {
      console.log({
        event: e,
        target: e.target, // Note 1* scrollTop is undefined on e.target
        currentTarget: e.currentTarget,
        scrollTop: e.currentTarget.scrollTop,
      });
  
      const { scrollTop } = e.currentTarget;
      if (scrollTop !== 0)  { // ignore the initial scroll event.
        setPreviewScrollPosition(scrollTop);
      }
    }


  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef.current!, {}, onResize);

  const file = useMemo(() => ({url: pdfObjectURL}), [pdfObjectURL]);

  if (loading) {
    return <div className="h-[80vh] w-full bg-white p-4">
        Loading...
    </div>
  }

    if (pdfObjectURL.length === 0) {
        return <div className="h-[80vh] w-full bg-white">

        </div>
    }

    return <div className="h-[80vh] bg-gray-200 p-2">
        <div onScroll={onScroll} className="h-full overflow-scroll" ref={containerRef}>
          <Document key={pdfObjectURL} file={file} onLoadSuccess={onDocumentLoadSuccess} >

        <div className="flex flex-col gap-2">
          {Array.from(new Array(numPages), (el, index) => (

                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                />
              ))}
              </div>

      </Document>
      </div>
    </div>
}