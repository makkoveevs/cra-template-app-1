import { Document, Paragraph, TextRun, Packer, PageBreak } from "docx";
import { downloadFile, saveBlobAsFile } from "./helpers";

export const Docx = (): JSX.Element => {
  const handleCreate = (): void => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Text in Paragraph 1",
              children: [
                new TextRun("TextRun"),
                new TextRun({
                  text: "Foo Bar",
                  bold: true,
                }),
                new TextRun({
                  text: "\tGithub is the best",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              text: "Text in Paragraph 1.Text in Paragraph 1.Text in Paragraph 1.Text in Paragraph 1. After Pagaraph inserted PageBreak",
              children: [new PageBreak()],
            }),
            new Paragraph({
              text: "Text in Paragraph 1 on two page",
              children: [
                new TextRun({
                  text: "TextRun 1",
                }),
                new TextRun({
                  text: "\tItalics bold with tabulation TextRun2",
                  italics: true,
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });
    Packer.toBlob(doc).then((res) => {
      const file = saveBlobAsFile(res, "doc.docx");
      downloadFile(file);
    });
  };

  return (
    <div>
      <button onClick={handleCreate}>Create</button>;
    </div>
  );
};
