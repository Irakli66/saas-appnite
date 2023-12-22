import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Expand, Loader2 } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useToast } from './ui/use-toast';
import { useResizeDetector } from 'react-resize-detector';
import { array } from 'zod';

interface PdfFulscreenProps {
  fileUrl: string;
}

const PdfFullScreen = ({ fileUrl }: PdfFulscreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();

  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button aria-label="fullscreen" variant="ghost" className="gap-1.5">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 my-24 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error laoding PDF',
                  description: 'Please try again laters',
                  variant: 'destructive',
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={fileUrl}
              className="max-h-full"
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  key={i}
                  //   width={width ? width : 1}
                  pageNumber={i + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullScreen;
