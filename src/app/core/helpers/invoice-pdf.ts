import { PdfMakeWrapper, Txt, Table, Img, Columns, Cell, Toc, TocItem, Canvas, Polyline} from 'pdfmake-wrapper';
import { ITable, IToc } from 'pdfmake-wrapper/lib/interfaces';
import pdfFonts from "pdfmake/build/vfs_fonts";

export const generatePdf = (modelPayment)=>{
  console.log(modelPayment);
  let type = 'venta';
  if(modelPayment.typeMoviment === 'E'){
      type = 'compra'
  }
  PdfMakeWrapper.setFonts(pdfFonts);
  const pdf = new PdfMakeWrapper();
  pdf.defaultStyle({
    fontSize: 10
  });
  //encabezado
  pdf.add(
    new Columns([
      new Txt(`Factura de ${type}  N°${modelPayment.numberInvoice}`).alignment("center").fontSize(13).bold().end,
      new Toc([
        new Txt('COMERCIALIZADORA S.A.S').alignment("center").bold().end,
        new Txt('1231231231313').alignment("center").end,
        new Txt(` calle 12 #3-12 `).alignment("center").end
      ]).alignment('left').end
    ]).margin([0,0,0,30]).columnGap(70).end
  )

  pdf.add(new Table([[new Txt("Datos del cliente").bold().end]]).widths([500]).margin([0,10,0,5]).end);

  //datos del cliente
  pdf.add(new Columns(
    [new Columns([ new Txt('Nombre completo').bold().end, new Txt(`${modelPayment.client?.person?.name} ${modelPayment.client?.person?.surname} ${modelPayment?.client?.person?.secondSurname} `).end ]).columnGap(-25).end,
     new Columns([ new Txt('Fecha de pago').bold().end, new Txt(`${modelPayment.dateInvoice}`).end ]).columnGap(-25).end
    ]).columnGap(60).margin([0,0,0,5]).end);

  pdf.add(new Columns(
    [new Columns([ new Txt('cedula').bold().end, new Txt(`${modelPayment?.client?.person?.documentNumber}`).end ]).columnGap(-25).end,
      new Columns([ new Txt('Dirección').bold().end, new Txt(`${modelPayment?.address}`).end ]).columnGap(-25).end
    ]).margin([0,0,0,5]).columnGap(60).end);

  pdf.add(new Columns(
    [new Columns([ new Txt('Transportista').bold().end, new Txt(`${modelPayment?.carrier?.person?.name} ${modelPayment?.carrier?.person?.surname} ${modelPayment?.carrier?.person?.secondSurname}`).end ]).columnGap(-25).end,
      new Columns([ new Txt('Tipo de pago').bold().end, new Txt(`${modelPayment?.typePayment?.description}`).end ]).columnGap(-25).end
    ]).margin([0,0,0,5]).columnGap(60).end);

  pdf.add(new Columns(
    [new Columns([ new Txt('Placa').bold().end, new Txt(`AA5-12`).end ]).columnGap(-25).end,
      new Columns([ new Txt('Lugar').bold().end, new Txt(`Magdalena`).end ]).columnGap(-25).end
    ]).margin([0,0,0,5]).columnGap(60).end);

    pdf.add(new Table([[new Txt("Detalle de la venta").bold().end]]).widths([500]).margin([0,5,0,0]).end);

   //tabla de articulos
    pdf.add( new Table([
        [new Txt("Artículos").bold().end, new Txt("cantidad").bold().end, new Txt("vlr.unidad").bold().end,
        new Txt("vlr.total").bold().end ],
        ...extractDetails(modelPayment.details)
    ]).widths([140,100,100, 100]).layout({
      fillColor: (rowIndex: number, node: any, columnIndex: number)=>{
          return rowIndex === 0 ? '#cccccc' : '';
      }
    }).margin([10,10,0,10]).end)

    //tabla de totales
    pdf.add(new Table([
      [ new Txt('Sub-total: ').bold().end , `$ ${modelPayment.total}`],
      [ new Txt('Descuentos: ').bold().end,'$ 0'],
      [new Txt('otros: ').bold().end,'$ 0'],
      [new Txt('valor Total: ').bold().end,`$ ${modelPayment.total}`],
    ]).layout('noBorders').margin([350,20,0,20]).widths([70,70]).end);

    pdf.add(new Table([[ new Txt("Observaciones").bold().end], [" "]]).widths([500]).margin([0,5,0,0]).end);
  pdf.create().open();
}

const extractDetails = (details)=>{
  let dataRow = [];
  details.forEach(item => {
    dataRow.push([item.article.name, item.quantity,item.unitValue,item.total])
  });
  return dataRow;
}


export const generatePdfPurchases= (modelPayment)=>{
  console.log(modelPayment);
  PdfMakeWrapper.setFonts(pdfFonts);
  const pdf = new PdfMakeWrapper();
  pdf.defaultStyle({
    fontSize: 10
  });
  //encabezado
  pdf.add(
    new Columns([
      new Txt(`Factura de compra N°${modelPayment.numberInvoice}`).alignment("center").fontSize(13).bold().end,
      new Toc([
        new Txt('COMERCIALIZADORA S.A.S').alignment("center").bold().end,
        new Txt('1231231231313').alignment("center").end,
        new Txt(` calle 12 #3-12 `).alignment("center").end
      ]).alignment('left').end
    ]).margin([0,0,0,30]).columnGap(70).end
  )

  pdf.add(new Table([[new Txt("Datos del proveedor").bold().end]]).widths([500]).margin([0,10,0,5]).end);

  //datos del proveedor
  pdf.add(new Columns(
    [new Columns([ new Txt('Nombre completo').bold().end, new Txt(`${modelPayment.supplier?.person?.name} ${modelPayment.supplier?.person?.surname} ${modelPayment?.supplier?.person?.secondSurname} `).end ]).columnGap(-25).end,
     new Columns([ new Txt('Fecha de pago').bold().end, new Txt(`${modelPayment.dateInvoice}`).end ]).columnGap(-25).end
    ]).columnGap(60).margin([0,0,0,5]).end);

  pdf.add(new Columns(
    [new Columns([ new Txt('cedula').bold().end, new Txt(`${modelPayment?.supplier?.person?.documentNumber}`).end ]).columnGap(-25).end,
      new Columns([ new Txt('Dirección').bold().end, new Txt(`${modelPayment?.address || ''}`).end ]).columnGap(-25).end
    ]).margin([0,0,0,5]).columnGap(60).end);

  pdf.add(new Columns(
    [new Columns([ new Txt('Empresa ').bold().end, new Txt(`${modelPayment?.supplier?.bussiness?.name}`).end ]).columnGap(-25).end,
      new Columns([ new Txt('Tipo de pago').bold().end, new Txt(`${modelPayment?.typePayment?.description || ''}`).end ]).columnGap(-25).end
    ]).margin([0,0,0,5]).columnGap(60).end);

  pdf.add(new Table([[new Txt("Detalle de la Compra").bold().end]]).widths([500]).margin([0,5,0,0]).end);

  //tabla de articulos
  pdf.add( new Table([
      [new Txt("Artículos").bold().end, new Txt("cantidad").bold().end, new Txt("vlr.unidad").bold().end,
      new Txt("vlr.total").bold().end ],
      ...extractDetails(modelPayment.details)
  ]).widths([140,100,100, 100]).layout({
    fillColor: (rowIndex: number, node: any, columnIndex: number)=>{
        return rowIndex === 0 ? '#cccccc' : '';
    }
  }).margin([10,10,0,10]).end)

  //tabla de totales
  pdf.add(new Table([
    [ new Txt('Sub-total: ').bold().end , `$ ${modelPayment.total}`],
    [ new Txt('Descuentos: ').bold().end,'$ 0'],
    [new Txt('otros: ').bold().end,'$ 0'],
    [new Txt('valor Total: ').bold().end,`$ ${modelPayment.total}`],
  ]).layout('noBorders').margin([350,20,0,20]).widths([70,70]).end);

  pdf.create().open();
}
