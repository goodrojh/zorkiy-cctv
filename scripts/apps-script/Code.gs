/**
 * ВИДЖИО — приём заявок с сайта.
 * Пишет каждую заявку строкой в Google-таблицу и дублирует письмом на почту компании.
 *
 * ОБНОВЛЕНИЕ (версия 2): добавлены лог отправки писем и диагностика,
 * письмо уходит в двух форматах (текст + HTML) — так оно реже попадает в спам.
 *
 * УСТАНОВКА / ОБНОВЛЕНИЕ:
 *  1. В таблице: Расширения → Apps Script.
 *  2. Выделите весь старый код и замените этим файлом целиком. Сохраните (Ctrl+S).
 *  3. ОБЯЗАТЕЛЬНО: Развернуть → Управление развёртываниями → карандаш (изменить)
 *     → Версия: «Новая версия» → Развернуть.
 *     Без этого шага сайт продолжит работать со старым кодом.
 *  4. URL развёртывания менять не нужно — он остаётся прежним.
 */

var SHEET_NAME = "Заявки";
var LOG_SHEET = "Лог";
var NOTIFY_EMAIL = "info@vidzhio.ru";
var COMPANY = "ВИДЖИО";
var DIAG_TOKEN = "mOGWYui9PIQh"; // для проверки состояния: ?diag=mOGWYui9PIQh

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    saveToSheet_(data);
    var mail = notify_(data);
    log_("заявка принята", mail);
    return json_({ ok: true, mail: mail });
  } catch (err) {
    try {
      log_("ОШИБКА: " + err, e && e.postData ? String(e.postData.contents).slice(0, 500) : "");
    } catch (ignored) {}
    return json_({ ok: false, error: String(err) });
  }
}

/** Диагностика: откройте URL развёртывания с ?diag=<токен> */
function doGet(e) {
  var token = e && e.parameter ? e.parameter.diag : "";
  if (token !== DIAG_TOKEN) return json_({ ok: true, service: COMPANY + " lead endpoint" });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  var logSheet = ss.getSheetByName(LOG_SHEET);
  var lastLogs = [];
  if (logSheet && logSheet.getLastRow() > 1) {
    var from = Math.max(2, logSheet.getLastRow() - 4);
    lastLogs = logSheet.getRange(from, 1, logSheet.getLastRow() - from + 1, 3).getValues();
  }
  return json_({
    ok: true,
    таблица: ss.getName(),
    ссылка: ss.getUrl(),
    лист_заявок: sheet ? SHEET_NAME : "НЕ НАЙДЕН",
    строк_в_заявках: sheet ? Math.max(0, sheet.getLastRow() - 1) : 0,
    почта_уведомлений: NOTIFY_EMAIL,
    аккаунт_скрипта: Session.getEffectiveUser().getEmail(),
    остаток_писем_на_сегодня: MailApp.getRemainingDailyQuota(),
    последние_события: lastLogs,
  });
}

/** Добавляет строку; если в заявке появились новые поля — добавляет колонки автоматически */
function saveToSheet_(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  var row = { "Дата и время": formatDate_(new Date()) };
  Object.keys(data).forEach(function (k) {
    if (k === "ts") return;
    var v = data[k];
    if (v === null || v === undefined || v === "") return;
    row[k] = String(v);
  });

  var headers = [];
  if (sheet.getLastRow() > 0) {
    headers = sheet.getRange(1, 1, 1, Math.max(1, sheet.getLastColumn())).getValues()[0].filter(String);
  }
  Object.keys(row).forEach(function (k) {
    if (headers.indexOf(k) === -1) headers.push(k);
  });

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);

  var values = headers.map(function (h) {
    return row[h] === undefined ? "" : row[h];
  });
  sheet.appendRow(values);
  sheet.autoResizeColumns(1, Math.min(headers.length, 12));
}

/** Письмо с заявкой. Возвращает краткий статус для лога и ответа сайту. */
function notify_(data) {
  var quotaBefore = MailApp.getRemainingDailyQuota();
  if (quotaBefore < 1) return "НЕ ОТПРАВЛЕНО: исчерпана дневная квота писем";

  var name = data["Имя"] || "без имени";
  var phone = data["Телефон"] || "";
  var subject = "Заявка с сайта: " + name + " " + phone;

  var plain = Object.keys(data)
    .filter(function (k) {
      return k !== "ts" && data[k] !== "" && data[k] !== null && data[k] !== undefined;
    })
    .map(function (k) {
      return k + ": " + data[k];
    })
    .join("\n");

  var rows = Object.keys(data)
    .filter(function (k) {
      return k !== "ts" && data[k] !== "" && data[k] !== null && data[k] !== undefined;
    })
    .map(function (k) {
      return (
        '<tr><td style="padding:6px 14px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">' +
        escape_(k) +
        '</td><td style="padding:6px 0;color:#0e1421;font-weight:600">' +
        escape_(String(data[k])) +
        "</td></tr>"
      );
    })
    .join("");

  var digits = String(phone).replace(/\D/g, "");
  var buttons = digits
    ? '<p style="margin:18px 0 0"><a href="tel:+' +
      digits +
      '" style="background:#00D68F;color:#080B12;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:700;display:inline-block">Позвонить</a>&nbsp;&nbsp;' +
      '<a href="https://wa.me/' +
      digits +
      '" style="background:#25D366;color:#ffffff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:700;display:inline-block">WhatsApp</a></p>'
    : "";

  var html =
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">' +
    '<h2 style="margin:0 0 4px;color:#0e1421">Новая заявка с сайта</h2>' +
    '<p style="margin:0 0 16px;color:#6b7280;font-size:13px">' +
    formatDate_(new Date()) +
    " · перезвоните в течение 15 минут</p>" +
    '<table style="border-collapse:collapse;font-size:14px">' +
    rows +
    "</table>" +
    buttons +
    "</div>";

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: "Новая заявка с сайта " + COMPANY + "\n\n" + plain,
      htmlBody: html,
      name: COMPANY + " · сайт",
      replyTo: NOTIFY_EMAIL,
    });
    return "отправлено на " + NOTIFY_EMAIL + " (остаток квоты " + (quotaBefore - 1) + ")";
  } catch (err) {
    return "ОШИБКА ОТПРАВКИ: " + err;
  }
}

function log_(event, details) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(LOG_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(LOG_SHEET);
    sheet.appendRow(["Дата и время", "Событие", "Детали"]);
    sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([formatDate_(new Date()), String(event), String(details).slice(0, 2000)]);
}

function formatDate_(d) {
  return Utilities.formatDate(d, "Europe/Moscow", "dd.MM.yyyy HH:mm:ss");
}

function escape_(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Запустите вручную, чтобы проверить таблицу и письмо. Результат — во всплывающем логе (Ctrl+Enter). */
function testLead() {
  var demo = {
    Форма: "test",
    Заголовок: "Тестовая заявка",
    Имя: "Тест",
    Телефон: "+7 (925) 127-91-13",
    Объект: "Частный дом / дача",
    Согласие: "да, " + formatDate_(new Date()),
  };
  saveToSheet_(demo);
  var res = notify_(demo);
  log_("ручной тест", res);
  Logger.log("Почта: " + NOTIFY_EMAIL + " | Результат: " + res);
  Logger.log("Остаток писем на сегодня: " + MailApp.getRemainingDailyQuota());
}
