// ============================================================
//  SOS UBÁ — Google Apps Script
//  Cole este código em: Extensões → Apps Script → Código.gs
// ============================================================

var SHEET_NAME = "Respostas";

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Cria a aba e cabeçalhos se não existir
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.getRange("B1:H1").setValues([[
        "Data/Hora",
        "Nome da Instituição",
        "CNPJ",
        "Nº de Pessoas",
        "Medicamento Prioritário",
        "Endereço Completo",
        "Status"
      ]]);
      sheet.getRange("B1:H1").setFontWeight("bold");
    }

    // Parse do corpo JSON
    var data = JSON.parse(e.postData.contents);

    var now         = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
    var nome        = data.nome_instituicao        || "";
    var cnpj        = data.cnpj                    || "";
    var numPessoas  = data.num_pessoas             || 0;
    var medicamento = data.medicamento_prioritario || "";
    var endereco    = data.endereco                || "";

    // Próxima linha vazia a partir da coluna B
    var nextRow = Math.max(sheet.getLastRow() + 1, 2);

    sheet.getRange(nextRow, 2, 1, 7).setValues([[
      now,
      nome,
      cnpj,
      numPessoas,
      medicamento,
      endereco,
      "Pendente"
    ]]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Teste manual no editor (menu Executar → testeLocal) ──────
function testeLocal() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        nome_instituicao:        "Associação Teste",
        cnpj:                    "12.345.678/0001-90",
        num_pessoas:             120,
        medicamento_prioritario: "Dipirona",
        endereco:                "Rua das Flores, 100 — Centro, Ubá — MG"
      })
    }
  };
  Logger.log(doPost(fakeEvent).getContent());
}
