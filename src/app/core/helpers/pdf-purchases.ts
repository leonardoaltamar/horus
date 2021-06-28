import { PdfMakeWrapper, Txt, Table, Columns, Toc} from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";


const extractDetails = (details)=>{
  let dataRow = [];
  details.forEach(item => {
    dataRow.push([item.article.name, item.quantity,item.unitValue, (item.quantity * item.unitValue)])
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
    [new Columns([ new Txt('Nombre completo:').bold().end, new Txt(`${modelPayment.supplier?.person?.name} ${modelPayment.supplier?.person?.surname} ${modelPayment?.supplier?.person?.secondSurname} `).end ]).columnGap(-40).end,
     new Columns([ new Txt('Fecha de la compra:').bold().end, new Txt(`${modelPayment.dateInvoice}`).end ]).columnGap(-75).end
    ]).columnGap(60).margin([0,0,0,5]).end);

  pdf.add(new Columns(
    [new Columns([ new Txt('Documento de identidad:').bold().end, new Txt(`${modelPayment?.supplier?.person?.documentNumber}`).end ]).columnGap(3).end,
      new Columns([ new Txt('Dirección:').bold().end, new Txt(`${modelPayment?.address || ''}`).end ]).columnGap(-25).end
    ]).margin([0,0,0,5]).columnGap(60).end);

  pdf.add(new Columns(
    [new Columns([ new Txt('Empresa: ').bold().end, new Txt(`${modelPayment?.supplier?.bussiness?.name || ''}`).end ]).columnGap(-25).end,
      new Columns([ new Txt('Tipo de pago:').bold().end, new Txt(`${modelPayment?.typePayment?.description || ''}`).end ]).columnGap(-25).end
    ]).margin([0,0,0,5]).columnGap(60).end);

  pdf.add(new Table([[new Txt("Detalle de la Compra").bold().end]]).widths([500]).margin([0,5,0,0]).end);

  //tabla de articulos
  pdf.add( new Table([
      [new Txt("Artículos").bold().end, new Txt("cantidad").bold().end, new Txt("vlr.unidad").bold().end,
      new Txt("vlr.total").bold().end ],
      ...extractDetails(modelPayment.details)
  ]).widths([150,110,110, 103]).layout({
    fillColor: (rowIndex: number, node: any, columnIndex: number)=>{
        return rowIndex === 0 ? '#cccccc' : '';
    }
  }).margin([0,-1,0,10]).end)

  //tabla de totales
  pdf.add(new Table([
    [ new Txt('IVA: ').bold().end , `$ ${modelPayment.totalLien || '$ 0'}`],
    [ new Txt('Sub-total: ').bold().end , `$ ${modelPayment.subTotal || '$ 0'}`],
    [ new Txt('Descuentos: ').bold().end,'$ 0'],
    [new Txt('otros: ').bold().end,'$ 0'],
    [new Txt('valor Total: ').bold().end,`$ ${modelPayment.total}`],
  ]).layout('noBorders').margin([350,20,0,20]).widths([70,70]).end);

  pdf.create().open();
}
