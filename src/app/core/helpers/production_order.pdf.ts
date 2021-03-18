import { PdfMakeWrapper, Txt, Table, Img, Columns, Cell, Toc, TocItem, Canvas, Polyline} from 'pdfmake-wrapper';
import { ITable, IToc } from 'pdfmake-wrapper/lib/interfaces';
import pdfFonts from "pdfmake/build/vfs_fonts";

export const generatePdf = (productionOrder) =>{
  console.log(productionOrder);
  PdfMakeWrapper.setFonts(pdfFonts);
  const pdf = new PdfMakeWrapper();

  //encabezado
  pdf.add([
    new Columns([
      new Txt(`Orden de prducción N°${productionOrder.numOrder || ''}`).alignment("center").fontSize(12).bold().end,
      new Txt(`Fecha: ${productionOrder.date || ''}`).alignment("center").fontSize(12).bold().end
    ]).margin([0,0,0,5]).columnGap(70).end,
    new Columns([
      new Txt(`Numero de lote: ${productionOrder.numLote || ''}`).alignment("center").fontSize(12).bold().end,
      new Txt(`Estado: ${(productionOrder.state==='E' ? 'Pendiente': 'Finalizado') || ''}`).alignment("center").fontSize(12).bold().end
    ]).margin([0,0,0,30]).columnGap(70).end
  ])
  //listado de productos

  pdf.add(new Txt("Listado de productos").end);

  productionOrder.details.forEach(detail => {
    pdf.add(new Table([[new Txt(`${detail.article.name}`).fontSize(12).bold().end, new Txt(`Unidades: ${detail.quantity}`).bold().fontSize(12).end]]).widths([400,100]).margin([0,10,0,0]).end);
    pdf.add(
      new Table([
        [new Txt("Materia prima").fontSize(11).bold().end, new Txt("Cantidad").fontSize(11).bold().end],
        ...extractRawMaterials(detail.article.rawMaterials)
      ]).widths([400,100]).margin([0,-1,0,10]).end
      );
  });
  pdf.create().open();
}

const extractRawMaterials = (rawMaterials)=>{
    const list = [];

    if(rawMaterials){
      rawMaterials.forEach(item => {
         list.push([item.article.name, `${item.quantity} ${item.measurement.description}`])
      });
    }
    return list;
}
