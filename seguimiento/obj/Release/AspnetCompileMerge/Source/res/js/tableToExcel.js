const tableToExcel = (() => {
      var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = (s) =>window.btoa(unescape(encodeURIComponent(s)))

        , format = (s, c)=> s.replace(/{(\w+)}/g,(m, p)=>c[p])

      return (table, name) => {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
          window.location.href = uri + base64(format(template, ctx))
      }
})()

const tabla_a_excel = (id_tabla) =>{
    var a = document.createElement('a');

    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById(id_tabla);
    var table_html = table_div.outerHTML.replace(/ /g, '%20');
    a.href = data_type + ', ' + table_html;

    a.download = 'download.xlsx';

    a.click();

    e.preventDefault();
}